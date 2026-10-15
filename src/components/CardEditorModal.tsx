import React, { useState } from 'react';
import type { AbilityCard, CardCategory, CardType } from '../types.ts';
import { MonopolyCard } from './MonopolyCard.tsx';
import { validateCard } from '../deck/deckLogic.ts';
import { 
  X, 
  Save, 
  Sparkles, 
  RefreshCw, 
  Wand2, 
  AlertCircle, 
  Check, 
  Layers,
  ArrowDownToLine
} from 'lucide-react';

interface CardEditorModalProps {
  initialCard?: AbilityCard | null;
  onSave: (card: AbilityCard) => void;
  onClose: () => void;
}

const COLOR_PRESETS = [
  { name: 'Giallo Classico', hex: '#FFE500' },
  { name: 'Azzurro Cielo', hex: '#0EA5E9' },
  { name: 'Smeraldo', hex: '#10B981' },
  { name: 'Rosso Vittoria', hex: '#EF4444' },
  { name: 'Arancione Cantiere', hex: '#F97316' },
  { name: 'Viola Mistero', hex: '#8B5CF6' },
  { name: 'Rosa Lusso', hex: '#EC4899' },
  { name: 'Oro Imperiale', hex: '#EAB308' },
  { name: 'Blu Oceano', hex: '#3B82F6' },
  { name: 'Grigio Cassaforte', hex: '#64748B' },
];

const ILLUSTRATION_PRESETS = [
  { key: 'juggling-contracts', label: 'Mr. Monopoly Contratti (Originale)' },
  { key: 'green-houses', label: 'Condono Edilizio & 2 Case Verdi' },
  { key: 'solar-energy', label: 'Ecobonus 110% & Scudo Solare' },
  { key: 'umbrella-shield', label: 'Ombrello Anti-Fitto' },
  { key: 'golden-crown', label: 'Corona Monopolio' },
  { key: 'crane-hotel', label: 'Gru Edilizia & Hotel' },
  { key: 'bank-president', label: 'Direttore di Banca' },
  { key: 'magnetic-dice', label: 'Dadi Magnetici' },
  { key: 'penthouse-tower', label: 'Grattacielo Penthouse' },
  { key: 'vault-door', label: 'Porta Blindata Cassaforte' },
  { key: 'prison-escape', label: 'Evasione con Eleganza' },
  { key: 'auction-paddle', label: 'Paletta d\'Asta' },
  { key: 'sports-car', label: 'Auto Sportiva Parcheggio' },
  { key: 'wrecking-ball', label: 'Palla da Demolizione' },
  { key: 'bullet-train', label: 'Treno Alta Velocità' },
  { key: 'helicopter-money', label: 'Salvataggio Elicottero' },
  { key: 'judge-gavel', label: 'Martello del Giudice' },
  { key: 'power-grid', label: 'Rete Elettrica & Idrica' },
];

const PROMPT_INSPIRATIONS = [
  'Mr. Monopoly che scappa con una cassa di lingotti d\'oro',
  'Un cane poliziotto che insegue una pedina di gioco',
  'Un grattacielo rosso brillante circondato da banconote volanti',
  'Una valigetta blindata con un lucchetto d\'oro splendente',
  'Un elicottero giallo che solleva un intero quartiere di case verdi',
  'Mr. Monopoly che esulta lanciando dadi giganti scintillanti',
];

export const CardEditorModal: React.FC<CardEditorModalProps> = ({
  initialCard,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<Partial<AbilityCard>>({
    id: initialCard?.id || `custom-card-${Date.now()}`,
    title: initialCard?.title || 'NUOVA ABILITÀ',
    cost: initialCard?.cost ?? 250,
    type: initialCard?.type || 'permanente',
    category: initialCard?.category || 'contratti',
    subtitle: initialCard?.subtitle || 'Questa abilità rimane attiva finché possiedi questa carta.',
    description: initialCard?.description || 'Descrivi qui il super potere di questa carta Monopoly.',
    bannerColor: initialCard?.bannerColor || '#FFE500',
    illustrationKey: initialCard?.illustrationKey || 'juggling-contracts',
    customSvg: initialCard?.customSvg,
    customImageUrl: initialCard?.customImageUrl,
    aiPrompt: initialCard?.aiPrompt || '',
    rarity: initialCard?.rarity || 'rara',
    cornerStyle: initialCard?.cornerStyle || 'squared',
    custom: true,
  });

  const [illustrationMode, setIllustrationMode] = useState<'preset' | 'ai'>(
    initialCard?.customSvg || initialCard?.customImageUrl ? 'ai' : 'preset'
  );
  const [aiPrompt, setAiPrompt] = useState(initialCard?.aiPrompt || initialCard?.description || '');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleTypeChange = (newType: CardType) => {
    let defaultSubtitle = formData.subtitle;
    if (newType === 'permanente') {
      defaultSubtitle = 'Questa abilità rimane attiva finché possiedi questa carta.';
    } else if (newType === 'istantanea') {
      defaultSubtitle = 'Azione Immediata - Gioca nel tuo turno.';
    } else if (newType === 'reazione') {
      defaultSubtitle = 'Reazione immediata - Gioca quando un evento si verifica.';
    }
    setFormData({ ...formData, type: newType, subtitle: defaultSubtitle });
  };

  const handleGenerateAiIcon = async () => {
    const promptToUse = aiPrompt.trim() || formData.description?.trim();
    if (!promptToUse) {
      setAiError('Inserisci una descrizione dell\'effetto o del simbolo per generare l\'icona.');
      return;
    }

    setIsGeneratingAi(true);
    setAiError(null);
    setAiSuccessMessage(null);

    try {
      const response = await fetch('/api/generate-icon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptToUse,
          title: formData.title || 'Carta Abilità Monopoly',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore nella generazione dell\'icona.');
      }

      if (data.type === 'raster' && data.imageUrl) {
        setFormData(prev => ({
          ...prev,
          customImageUrl: data.imageUrl,
          customSvg: undefined,
          aiPrompt: promptToUse,
        }));
        setAiSuccessMessage('Icona grafica generata con successo da Gemini AI!');
      } else if (data.type === 'svg' && data.svgCode) {
        setFormData(prev => ({
          ...prev,
          customSvg: data.svgCode,
          customImageUrl: undefined,
          aiPrompt: promptToUse,
        }));
        setAiSuccessMessage('Simbolo vettoriale originale generato con successo da Gemini AI!');
      } else {
        throw new Error('Formato icona restituito non riconosciuto.');
      }

    } catch (err: any) {
      console.error('AI generation failed:', err);
      setAiError(err.message || 'Impossibile completare la generazione AI in questo momento.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleUseCardDescriptionForAi = () => {
    if (formData.description) {
      setAiPrompt(formData.description);
    }
  };

  const handleResetToPresetIcon = () => {
    setFormData(prev => ({
      ...prev,
      customSvg: undefined,
      customImageUrl: undefined,
      aiPrompt: undefined,
    }));
    setAiSuccessMessage(null);
    setAiError(null);
  };

  const handleSave = () => {
    const validation = validateCard(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    onSave(formData as AbilityCard);
  };

  const previewCard: AbilityCard = {
    id: formData.id || 'preview',
    title: formData.title || 'TITOLO CARTA',
    cost: Number(formData.cost) || 0,
    type: (formData.type as CardType) || 'permanente',
    category: (formData.category as CardCategory) || 'contratti',
    subtitle: formData.subtitle || '',
    description: formData.description || '',
    bannerColor: formData.bannerColor || '#FFE500',
    illustrationKey: formData.illustrationKey || 'juggling-contracts',
    customSvg: formData.customSvg,
    customImageUrl: formData.customImageUrl,
    aiPrompt: formData.aiPrompt,
    rarity: formData.rarity || 'rara',
    cornerStyle: formData.cornerStyle || 'squared',
    custom: true,
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      data-testid="card-editor-modal"
    >
      <div 
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Chiudi editor"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Live Real-Time Preview */}
        <div className="w-full md:w-[42%] p-6 flex flex-col items-center justify-center bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Anteprima in Tempo Reale
          </div>
          <div className="py-2 scale-90 sm:scale-100 transition-transform">
            <MonopolyCard card={previewCard} size="md" cornerStyle={formData.cornerStyle || 'squared'} />
          </div>
          {previewCard.customSvg || previewCard.customImageUrl ? (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold mt-2">
              <Check className="w-3.5 h-3.5" /> Icona generata con AI attiva
            </div>
          ) : (
            <span className="text-[11px] text-slate-400 mt-2">
              Formato fedele all'originale con doppio bordo e watermark
            </span>
          )}
        </div>

        {/* Right Side: Form Inputs */}
        <div className="w-full md:w-[58%] p-6 overflow-y-auto space-y-4">
          <div>
            <h2 className="text-xl font-bold text-white font-['Outfit']">
              {initialCard ? 'Modifica Carta Abilità' : 'Crea Nuova Carta Abilità'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalizza testi, valore in denaro Monopoly, grafica e colori
            </p>
          </div>

          {errors.length > 0 && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1">
              {errors.map((err, i) => (
                <div key={i}>• {err}</div>
              ))}
            </div>
          )}

          {/* Title & Cost */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Titolo Carta (Maiuscolo)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value.toUpperCase() })}
                placeholder="ES. TUTTI I CONTRATTI"
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-black text-sm uppercase focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Valore (M)
              </label>
              <input
                type="number"
                value={formData.cost}
                onChange={e => setFormData({ ...formData, cost: parseInt(e.target.value) || 0 })}
                min="0"
                max="5000"
                step="25"
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-amber-400 font-bold text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Type & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Tipologia Attivazione
              </label>
              <select
                value={formData.type}
                onChange={e => handleTypeChange(e.target.value as CardType)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="permanente">Abilità Permanente (Attiva continua)</option>
                <option value="istantanea">Azione Immediata (Gioca e scarta)</option>
                <option value="reazione">Reazione (Gioca a sorpresa)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">
                Categoria di Gioco
              </label>
              <select
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as CardCategory })}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="contratti">Contratti & Monopoli</option>
                <option value="affitti">Affitti & Immunità</option>
                <option value="finanza">Banca & Finanza</option>
                <option value="edilizia">Edilizia & Cantieri</option>
                <option value="trasporti">Movimento & Dadi</option>
                <option value="intrighi">Intrighi & Giustizia</option>
              </select>
            </div>
          </div>

          {/* Subtitle */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Sottotitolo / Condizione (in corsivo sulla carta)
            </label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs italic focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Description / Rules */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">
              Descrizione Effetto & Regole
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs leading-relaxed focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          {/* ================= AI ICON GENERATOR / GRAPHIC SECTION ================= */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                Grafica & Simbolo dell'Icona
              </label>

              {/* Mode switch */}
              <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700 text-[11px]">
                <button
                  type="button"
                  onClick={() => setIllustrationMode('preset')}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    illustrationMode === 'preset' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Predefinite
                </button>
                <button
                  type="button"
                  onClick={() => setIllustrationMode('ai')}
                  className={`px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 ${
                    illustrationMode === 'ai' ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black' : 'text-amber-400 hover:text-amber-300 font-semibold'
                  }`}
                >
                  <Sparkles className="w-3 h-3" /> Genera con AI
                </button>
              </div>
            </div>

            {/* AI Generator Panel */}
            {illustrationMode === 'ai' ? (
              <div className="space-y-3 pt-1">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Descrivi il simbolo o l'effetto da illustrare:</span>
                    <button
                      type="button"
                      onClick={handleUseCardDescriptionForAi}
                      className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
                    >
                      <ArrowDownToLine className="w-3 h-3" /> Copia descrizione carta
                    </button>
                  </div>
                  
                  <textarea
                    rows={2}
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    placeholder="Es. Un elicottero d'oro che paracaduta sacchi di denaro su una villa di lusso..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                {/* Quick Inspiration Pills */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-slate-400">
                    Suggerimenti veloci:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PROMPT_INSPIRATIONS.map((promptText, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setAiPrompt(promptText)}
                        className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] border border-slate-700/60 transition-colors"
                      >
                        {promptText.length > 38 ? promptText.slice(0, 38) + '...' : promptText}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Messages */}
                {aiError && (
                  <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{aiError}</span>
                  </div>
                )}

                {aiSuccessMessage && (
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>{aiSuccessMessage}</span>
                  </div>
                )}

                {/* AI Action Button */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    disabled={isGeneratingAi}
                    onClick={handleGenerateAiIcon}
                    className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingAi ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Gemini sta illustrando il simbolo...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        {formData.customSvg || formData.customImageUrl ? 'Rigenera Simbolo con AI' : 'Crea Simbolo Grafico con AI'}
                      </>
                    )}
                  </button>

                  {(formData.customSvg || formData.customImageUrl) && (
                    <button
                      type="button"
                      onClick={handleResetToPresetIcon}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                    >
                      Rimuovi AI
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Preset Icon Selector */
              <div className="space-y-1">
                <select
                  value={formData.illustrationKey}
                  onChange={e => {
                    handleResetToPresetIcon();
                    setFormData(prev => ({ ...prev, illustrationKey: e.target.value }));
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
                >
                  {ILLUSTRATION_PRESETS.map(p => (
                    <option key={p.key} value={p.key}>{p.label}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Stile Angoli Carta (Taglio & Bordo) - Ispirato dall'originale */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                Stile Angoli Carta (Taglio & Bordo)
              </label>
              <span className="text-[11px] text-amber-400 font-semibold">Ispirato dall'originale Monopoly</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, cornerStyle: 'squared' })}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  (formData.cornerStyle || 'squared') === 'squared'
                    ? 'bg-amber-500/20 border-amber-400 text-white font-bold ring-1 ring-amber-400/50'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="w-5 h-5 border-2 border-current rounded-none flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-current" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">A Squadro (Originale)</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Angolo retto 90° fedele al gioco da tavolo</div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, cornerStyle: 'rounded' })}
                className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                  formData.cornerStyle === 'rounded'
                    ? 'bg-amber-500/20 border-amber-400 text-white font-bold ring-1 ring-amber-400/50'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div className="w-5 h-5 border-2 border-current rounded-lg flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 bg-current rounded-full" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Angolo Tondo</div>
                  <div className="text-[10px] text-slate-400 leading-tight">Bordi arrotondati stile carte moderne</div>
                </div>
              </button>
            </div>
          </div>

          {/* Banner Color Picker with Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">
              Colore Intestazione Banner
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {COLOR_PRESETS.map(preset => (
                <button
                  key={preset.hex}
                  type="button"
                  onClick={() => setFormData({ ...formData, bannerColor: preset.hex })}
                  title={preset.name}
                  className={`w-7 h-7 rounded-full border-2 transition-transform ${
                    formData.bannerColor === preset.hex ? 'scale-110 border-white ring-2 ring-amber-400' : 'border-slate-800 hover:scale-105'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                />
              ))}
              <div className="flex items-center gap-1.5 ml-2">
                <input
                  type="color"
                  value={formData.bannerColor}
                  onChange={e => setFormData({ ...formData, bannerColor: e.target.value })}
                  className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
                />
                <span className="text-xs font-mono text-slate-400 uppercase">{formData.bannerColor}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Annulla
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <Save className="w-3.5 h-3.5" /> Salva nel Mazzo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
