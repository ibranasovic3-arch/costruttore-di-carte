import React, { useState, useEffect } from 'react';
import type { AbilityCard, CardCategory, CardType } from './types.ts';
import { INITIAL_DECK, CATEGORY_LABELS, TYPE_LABELS } from './deck/deckData.ts';
import { filterDeck } from './deck/deckLogic.ts';
import { MonopolyCard } from './components/MonopolyCard.tsx';
import { CardModal } from './components/CardModal.tsx';
import { CardEditorModal } from './components/CardEditorModal.tsx';
import { PrintSheetModal } from './components/PrintSheetModal.tsx';
import { GameTableSimulator } from './components/GameTableSimulator.tsx';
import { 
  Sparkles, 
  Search, 
  Printer, 
  Plus, 
  Dices, 
  Layers, 
  SlidersHorizontal, 
  RotateCw, 
  Eye, 
  Flame, 
  Check, 
  HelpCircle,
  Download
} from 'lucide-react';

const STORAGE_KEY = 'monopoly_ability_deck_v3';
const CORNER_KEY = 'monopoly_corner_style_pref';

export default function App() {
  const [globalCornerStyle, setGlobalCornerStyle] = useState<'squared' | 'rounded'>(() => {
    try {
      const savedCorner = localStorage.getItem(CORNER_KEY);
      if (savedCorner === 'rounded' || savedCorner === 'squared') {
        return savedCorner;
      }
    } catch {
      // fallback
    }
    return 'squared'; // Default to squared (inspired by the original)
  });

  const [deck, setDeck] = useState<AbilityCard[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge defaults with saved so newly added expansion cards always appear
          const savedIds = new Set(parsed.map((c: AbilityCard) => c.id));
          const missingDefaults = INITIAL_DECK.filter(c => !savedIds.has(c.id));
          return [...parsed, ...missingDefaults];
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_DECK;
  });

  const [activeTab, setActiveTab] = useState<'deck' | 'game' | 'rules'>('deck');
  const [selectedCategory, setSelectedCategory] = useState<CardCategory | 'all'>('all');
  const [selectedType, setSelectedType] = useState<CardType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'cost-asc' | 'cost-desc' | 'title'>('default');
  
  // Modals state
  const [inspectCard, setInspectCard] = useState<AbilityCard | null>(null);
  const [editingCard, setEditingCard] = useState<AbilityCard | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [flipAllCards, setFlipAllCards] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
    } catch (e) {
      console.warn('Could not save deck to localStorage', e);
    }
  }, [deck]);

  useEffect(() => {
    try {
      localStorage.setItem(CORNER_KEY, globalCornerStyle);
    } catch (e) {
      console.warn('Could not save corner preference', e);
    }
  }, [globalCornerStyle]);

  const filteredCards = filterDeck(deck, {
    category: selectedCategory,
    type: selectedType,
    searchQuery,
    sortBy,
  });

  const handleSaveCard = (savedCard: AbilityCard) => {
    setDeck(prev => {
      const exists = prev.some(c => c.id === savedCard.id);
      if (exists) {
        return prev.map(c => (c.id === savedCard.id ? savedCard : c));
      } else {
        return [savedCard, ...prev];
      }
    });
    setEditingCard(null);
    setIsCreatingNew(false);
  };

  const handleResetDeckToOriginal = () => {
    if (window.confirm('Vuoi ripristinare il mazzo completo con tutte le carte originali ed espansione?')) {
      setDeck(INITIAL_DECK);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/20 border-2 border-black">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
                <path d="M15 80 L15 20 L50 60 L85 20 L85 80" stroke="#111827" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="5" y1="42" x2="95" y2="42" stroke="#111827" strokeWidth="10" strokeLinecap="round" />
                <line x1="5" y1="56" x2="95" y2="56" stroke="#111827" strokeWidth="10" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white font-black text-[10px] tracking-widest px-2 py-0.5 rounded border border-black uppercase">
                  MONOPOLY
                </span>
                <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Mazzo Completo Carte Abilità
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight font-['Outfit']">
                Edizione Carte Potere & Abilità
              </h1>
            </div>
          </div>

          {/* Navigation Tabs & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setActiveTab('deck')}
                className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'deck' 
                    ? 'bg-amber-500 text-slate-950 shadow-md' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Mazzo ({deck.length})
              </button>
              <button
                onClick={() => setActiveTab('game')}
                className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'game' 
                    ? 'bg-amber-500 text-slate-950 shadow-md' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Dices className="w-3.5 h-3.5" /> Tavolo Gioco
              </button>
              <button
                onClick={() => setActiveTab('rules')}
                className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === 'rules' 
                    ? 'bg-amber-500 text-slate-950 shadow-md' 
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" /> Come Si Gioca
              </button>
            </div>

            {/* Print and Add Card buttons */}
            <button
              onClick={() => setShowPrintModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> Stampa A4
            </button>

            <button
              onClick={() => setIsCreatingNew(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Crea Carta
            </button>
          </div>

        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">

        {/* ================= TAB: MAZZO COMPLETO ================= */}
        {activeTab === 'deck' && (
          <div className="space-y-6">
            
            {/* Hero Card Callout for the User's Original Reference Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-slate-900 border border-amber-500/30 p-5 sm:p-6 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> Mazzo Completo Espansione Abilità
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                    Mazzo Completo Carte Abilità ({deck.length} Carte)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Comprende la carta originale richiesta <span className="text-amber-400 font-bold">"TUTTI I CONTRATTI"</span> (M 375, Mr. Monopoly e gli 8 contratti colorati) più tutte le carte espansione bilanciate (Condono Edilizio, Ecobonus 110%, Monopolio Istantaneo, e molte altre)! Clicca sulle carte per girarle in 3D.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  {/* Global Corner Style Selector */}
                  <div className="flex items-center justify-center w-full sm:w-auto bg-slate-950/90 border border-slate-700/80 rounded-xl p-1 text-xs">
                    <span className="text-[11px] text-slate-400 font-semibold px-2 shrink-0">Angoli:</span>
                    <button
                      onClick={() => setGlobalCornerStyle('squared')}
                      className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        globalCornerStyle === 'squared'
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : 'text-slate-300 hover:text-white'
                      }`}
                      title="Angoli a Squadro (90°) - Fedele all'originale retro Monopoly"
                    >
                      <span className="w-2.5 h-2.5 border-2 border-current rounded-none inline-block shrink-0" />
                      <span className="whitespace-nowrap">A Squadro (Originale)</span>
                    </button>
                    <button
                      onClick={() => setGlobalCornerStyle('rounded')}
                      className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        globalCornerStyle === 'rounded'
                          ? 'bg-amber-400 text-slate-950 shadow-md'
                          : 'text-slate-300 hover:text-white'
                      }`}
                      title="Angoli Arrotondati - Stile moderno"
                    >
                      <span className="w-2.5 h-2.5 border-2 border-current rounded-sm inline-block shrink-0" />
                      <span className="whitespace-nowrap">Angolo Tondo</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setFlipAllCards(!flipAllCards)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                    {flipAllCards ? 'Tutte Fronte' : 'Tutte Retro'}
                  </button>
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all active:scale-95"
                  >
                    <Printer className="w-3.5 h-3.5" /> Stampa Mazzo
                  </button>
                </div>
              </div>
            </div>

            {/* Filter and Search Controls */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              
              {/* Top row: Search and Sort */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Cerca per titolo, effetto o regola..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <span className="text-xs text-slate-400 font-semibold shrink-0">Ordina:</span>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="default">Ordine Consigliato</option>
                    <option value="cost-asc">Costo: Minore a Maggiore</option>
                    <option value="cost-desc">Costo: Maggiore a Minore</option>
                    <option value="title">Alfabetico (A-Z)</option>
                  </select>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Tutte le Categorie ({deck.length})
                </button>
                {Object.entries(CATEGORY_LABELS).map(([catKey, val]) => (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey as CardCategory)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                      selectedCategory === catKey
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-400'
                        : `${val.color} hover:bg-slate-800`
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-800 text-xs">
                <span className="text-slate-400 font-semibold">Tipo di Carta:</span>
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                    selectedType === 'all' ? 'text-amber-400 font-bold underline' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tutti
                </button>
                <button
                  onClick={() => setSelectedType('permanente')}
                  className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                    selectedType === 'permanente' ? 'text-blue-400 font-bold underline' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Abilità Continua
                </button>
                <button
                  onClick={() => setSelectedType('istantanea')}
                  className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                    selectedType === 'istantanea' ? 'text-amber-400 font-bold underline' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Azione Immediata
                </button>
                <button
                  onClick={() => setSelectedType('reazione')}
                  className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                    selectedType === 'reazione' ? 'text-rose-400 font-bold underline' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Reazione Immediata
                </button>
              </div>

            </div>

            {/* Deck Cards Grid */}
            {filteredCards.length === 0 ? (
              <div className="py-16 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <Layers className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-slate-300">Nessuna carta trovata</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Prova a modificare i filtri o il testo di ricerca.
                </p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSelectedType('all'); setSearchQuery(''); }}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 text-amber-400 text-xs font-bold"
                >
                  Reimposta Filtri
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {filteredCards.map((card) => (
                  <div key={card.id} className="flex flex-col items-center space-y-2 group">
                    {/* Badge for Original Card */}
                    {card.isOriginalReference && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                        ★ Carta Originale
                      </span>
                    )}

                    {/* The 3D Monopoly Card */}
                    <MonopolyCard
                      card={card}
                      size="md"
                      showBack={flipAllCards}
                      isFlippable={true}
                      cornerStyle={card.cornerStyle || globalCornerStyle}
                    />

                    {/* Card Actions on hover/below */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        onClick={() => setInspectCard(card)}
                        className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3 h-3 text-amber-400" /> Dettagli 3D
                      </button>
                      <button
                        onClick={() => setEditingCard(card)}
                        className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                      >
                        Modifica
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <span>Visualizzando {filteredCards.length} di {deck.length} carte totali</span>
              <button
                onClick={handleResetDeckToOriginal}
                className="hover:text-rose-400 transition-colors underline"
              >
                Ripristina Mazzo Predefinito (24 Carte)
              </button>
            </div>

          </div>
        )}

        {/* ================= TAB: TAVOLO DI GIOCO ================= */}
        {activeTab === 'game' && (
          <GameTableSimulator 
            deck={deck} 
            onInspectCard={(card) => setInspectCard(card)} 
          />
        )}

        {/* ================= TAB: REGOLE E GUIDA ================= */}
        {activeTab === 'rules' && (
          <div className="max-w-4xl mx-auto space-y-6 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Regolamento Ufficiale Espansione
              </span>
              <h2 className="text-2xl font-black text-white font-['Outfit'] mt-1">
                Come Integrare le Carte Abilità in Qualsiasi Partita di Monopoly
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-xs">1</span>
                  Preparazione del Mazzo
                </h3>
                <p>
                  Mescola il mazzo di 24 Carte Abilità e posizionalo a faccia in giù vicino al tabellone di Monopoly, accanto ai mazzi di Imprevisti e Probabilità.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-xs">2</span>
                  Come si Ottengono le Carte Abilità (3 Modalità di Gioco)
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li><strong className="text-slate-200">Modalità Negozio / Acquisto:</strong> Quando un giocatore si ferma su una casella d'angolo (es. VIA!, Parcheggio Gratuito o Transito) oppure all'inizio della partita, può pagare alla Banca il valore stampato nel sacco (es. M 375 per "Tutti i Contratti") per pescare o acquistare la carta.</li>
                  <li><strong className="text-slate-200">Modalità Fortuna / Dadi Doppi:</strong> Ogni volta che un giocatore ottiene un tiro di dadi doppi, pesca gratis 1 Carta Abilità.</li>
                  <li><strong className="text-slate-200">Draft Iniziale:</strong> All'inizio della partita, ogni giocatore riceve casualmente 1 o 2 Carte Abilità per personalizzare la propria strategia economica.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-xs">3</span>
                  Tipologie di Carte
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-slate-900 border border-blue-500/30">
                    <span className="font-bold text-blue-400 block text-xs uppercase">Abilità Continua</span>
                    <p className="text-xs text-slate-400 mt-1">Resta scoperta davanti al giocatore ed è sempre attiva (es. Tutti i Contratti, Direttore della Banca).</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-amber-500/30">
                    <span className="font-bold text-amber-400 block text-xs uppercase">Azione Immediata</span>
                    <p className="text-xs text-slate-400 mt-1">Si gioca nel proprio turno per un effetto immediato e potente, poi si scarta.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-rose-500/30">
                    <span className="font-bold text-rose-400 block text-xs uppercase">Reazione</span>
                    <p className="text-xs text-slate-400 mt-1">Si tiene coperta in mano e si gioca a sorpresa quando accade un evento (es. Immunità dal Fitto).</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center font-black text-xs">4</span>
                  Commercio e Trattative
                </h3>
                <p>
                  Le Carte Abilità possono essere scambiate, vendute o ipotecate tra giocatori durante le normali trattative di Monopoly al prezzo concordato liberamente tra le parti!
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setActiveTab('deck')}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition-all"
              >
                Esplora Tutte le 24 Carte del Mazzo
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ================= MODALS ================= */}

      {/* Card 3D Detail Modal */}
      {inspectCard && (
        <CardModal
          card={inspectCard}
          allCards={filteredCards}
          onClose={() => setInspectCard(null)}
          onSelectCard={(c) => setInspectCard(c)}
          onEditCard={(c) => {
            setInspectCard(null);
            setEditingCard(c);
          }}
          onUpdateCard={(c) => {
            handleSaveCard(c);
            setInspectCard(c);
          }}
        />
      )}

      {/* Card Editor / Creator Modal */}
      {(editingCard || isCreatingNew) && (
        <CardEditorModal
          initialCard={editingCard}
          onSave={handleSaveCard}
          onClose={() => {
            setEditingCard(null);
            setIsCreatingNew(false);
          }}
        />
      )}

      {/* Print Sheet Modal */}
      {showPrintModal && (
        <PrintSheetModal
          cards={deck}
          onClose={() => setShowPrintModal(false)}
        />
      )}

      {/* ================= FOOTER ================= */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Mazzo Completo Carte Abilità Monopoly • Grafiche & Vettori Fedeli all'Originale
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>24 Carte Pronte per la Stampa</span>
            <span>•</span>
            <span>Fronte & Retro Duplex</span>
            <span>•</span>
            <span>Valori in M Bilanciati</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
