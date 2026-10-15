import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini AI client with required User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// POST /api/generate-icon: Generates bespoke icon graphic for Monopoly cards
app.post('/api/generate-icon', async (req, res) => {
  try {
    const { prompt, style = 'monopoly_classic', title = '' } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ error: 'È richiesta una descrizione o effetto per generare l\'icona.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY non configurata nel server.' });
    }

    // Try generating with gemini-3.1-flash-lite-image first if available
    try {
      const imgRes = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: `A Monopoly card icon circular illustration: ${prompt}. Vintage 1930s board game art, Rich Uncle Pennybags mascot style, bold black ink outlines, clean solid colors, isolated in a circle vignette with transparent or white background.`,
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      const parts = imgRes.candidates?.[0]?.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          return res.json({
            type: 'raster',
            imageUrl: `data:${mime};base64,${part.inlineData.data}`,
            prompt,
          });
        }
      }
    } catch (imgError: any) {
      // If 429 quota exceeded or model unavailable, proceed to SVG generation with gemini-3.1-flash-lite
      console.log('Image model fallback to vector SVG generation:', imgError?.message?.slice(0, 80));
    }

    // High quality vector SVG generation tailored to Monopoly card circular vignette
    const systemPrompt = `You are an elite vector graphic designer and illustrator specializing in the classic Monopoly board game aesthetic (Rich Uncle Pennybags, vintage cartoon line art, bold black contours).
Task: Create a standalone, self-contained SVG illustration for a Monopoly Ability Card based on the user's effect description: "${prompt}" (Card title: "${title}").

Design Rules:
1. Must be valid raw SVG code ONLY (viewBox="0 0 240 200"). No markdown code fences, no introductory or concluding text.
2. Must feature a circular white vignette (e.g. <circle cx="120" cy="120" r="70" fill="#FFFFFF" stroke="#111827" strokeWidth="5" />).
3. Inside the vignette, illustrate the subject representing the card's effect with bold black outlines (strokeWidth 2 to 4), clean shapes, and vibrant board game colors (such as gold #FBBF24, red #EF4444, emerald green #10B981, blue #3B82F6, orange #F97316, purple #8B5CF6).
4. Do NOT include card headers or money bags (those are rendered separately around the vignette). Focus solely on the central character, object, or action symbol.
5. Make it charming, witty, and immediately recognizable in the Monopoly style.`;

    const svgRes = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
      ],
      config: {
        temperature: 0.7,
      },
    });

    let rawSvg = svgRes.text || '';
    
    // Clean any markdown formatting like ```xml or ```svg
    rawSvg = rawSvg.replace(/^```(svg|xml|html)?/i, '').replace(/```$/i, '').trim();
    
    // Extract SVG tag if wrapped in anything
    const svgMatch = rawSvg.match(/<svg[\s\S]*?<\/svg>/i);
    if (!svgMatch) {
      throw new Error('Impossibile estrarre codice SVG valido dalla risposta AI.');
    }

    const cleanSvg = svgMatch[0];

    return res.json({
      type: 'svg',
      svgCode: cleanSvg,
      prompt,
    });

  } catch (error: any) {
    console.error('Error generating icon:', error);
    return res.status(500).json({ 
      error: error.message || 'Errore durante la generazione dell\'icona con AI. Riprova tra poco.' 
    });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: Number(port), host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
