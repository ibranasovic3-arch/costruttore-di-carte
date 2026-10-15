import React, { useState } from 'react';
import type { AbilityCard } from '../types.ts';
import { MonopolyCard } from './MonopolyCard.tsx';
import { CATEGORY_LABELS, TYPE_LABELS } from '../deck/deckData.ts';
import { 
  X, 
  RotateCw, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  Share2, 
  Check, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CardModalProps {
  card: AbilityCard | null;
  allCards: AbilityCard[];
  onClose: () => void;
  onSelectCard: (card: AbilityCard) => void;
  onEditCard?: (card: AbilityCard) => void;
  onUpdateCard?: (card: AbilityCard) => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  card,
  allCards,
  onClose,
  onSelectCard,
  onEditCard,
  onUpdateCard,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!card) return null;

  const currentIndex = allCards.findIndex(c => c.id === card.id);
  const prevCard = currentIndex > 0 ? allCards[currentIndex - 1] : allCards[allCards.length - 1];
  const nextCard = currentIndex < allCards.length - 1 ? allCards[currentIndex + 1] : allCards[0];

  const handleShare = () => {
    const text = `Monopoly Carta Abilità: ${card.title} (Valore: M ${card.cost})\n"${card.description}"`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintSingle = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      data-testid="card-detail-modal"
    >
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Chiudi dettaglio carta"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: 3D Card Display */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 border-b md:border-b-0 md:border-r border-slate-800 relative">
          
          {/* Card Prev/Next Floating Controls */}
          <div className="w-full flex items-center justify-between mb-3 px-2 text-xs text-slate-400">
            <button
              onClick={() => { setIsFlipped(false); onSelectCard(prevCard); }}
              aria-label="Carta precedente"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors py-1 px-2 rounded-md hover:bg-slate-800/60"
            >
              <ChevronLeft className="w-4 h-4" /> Precedente
            </button>
            <span className="font-mono text-slate-500">
              {currentIndex + 1} / {allCards.length}
            </span>
            <button
              onClick={() => { setIsFlipped(false); onSelectCard(nextCard); }}
              aria-label="Carta successiva"
              className="flex items-center gap-1 hover:text-amber-400 transition-colors py-1 px-2 rounded-md hover:bg-slate-800/60"
            >
              Successiva <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* The Card */}
          <div className="my-auto py-2">
            <MonopolyCard 
              card={card} 
              size="lg" 
              showBack={isFlipped}
              isFlippable={true}
              onClick={() => setIsFlipped(!isFlipped)}
              cornerStyle={card.cornerStyle || 'squared'}
            />
          </div>

          {/* Card Interaction Bar with 3D Flip and Corner Toggle */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all active:scale-95"
            >
              <RotateCw className="w-3.5 h-3.5" />
              {isFlipped ? 'Mostra Fronte' : 'Mostra Retro'}
            </button>

            {/* Corner Toggle in Modal */}
            <button
              onClick={() => {
                const nextStyle = (card.cornerStyle || 'squared') === 'squared' ? 'rounded' : 'squared';
                const updated = { ...card, cornerStyle: nextStyle as 'squared' | 'rounded' };
                if (onUpdateCard) {
                  onUpdateCard(updated);
                } else if (onEditCard) {
                  onEditCard(updated);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all active:scale-95"
              title="Cambia stile angoli per questa carta (A Squadro o Tondo)"
            >
              {(card.cornerStyle || 'squared') === 'squared' ? (
                <>
                  <span className="w-2.5 h-2.5 border-2 border-amber-400 rounded-none inline-block" />
                  <span>Angoli: <strong>A Squadro</strong></span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 border-2 border-amber-400 rounded-sm inline-block" />
                  <span>Angoli: <strong>Tondi</strong></span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Card Deep Dive & Rules Analysis */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${TYPE_LABELS[card.type]?.badge || 'bg-slate-700'}`}>
                  {TYPE_LABELS[card.type]?.label || card.type}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${CATEGORY_LABELS[card.category]?.color || 'bg-slate-700 text-slate-300'}`}>
                  {CATEGORY_LABELS[card.category]?.label || card.category}
                </span>
                {card.isOriginalReference && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-black flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3" /> CARTA ORIGINALE
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-['Outfit']">
                {card.title}
              </h2>
              <p className="text-sm font-semibold text-amber-300/90 italic mt-1">
                {card.subtitle}
              </p>
            </div>

            {/* Price / Value badge */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <span className="text-xs uppercase font-bold text-slate-400">
                Valore d'Acquisto / Scambio
              </span>
              <span className="text-lg font-black text-amber-400 flex items-center gap-1">
                M {card.cost}
              </span>
            </div>

            {/* Official Rule text */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-amber-400" /> Testo Regola Ufficiale
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Strategic Advice */}
            <div className="space-y-2 text-xs text-slate-300">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Guida Strategica
              </h4>
              <p className="text-slate-400 leading-relaxed">
                {card.type === 'permanente' 
                  ? 'Mantieni questa carta davanti a te sul tavolo. Il suo effetto resta attivo continuamente finché non decidi di venderla o un avversario non te la ruba.'
                  : card.type === 'reazione'
                  ? 'Tieni questa carta coperta nella tua mano e giocala a sorpresa nel momento esatto in cui un avversario prova a farti pagare o danneggiarti!'
                  : 'Gioca questa carta nel tuo turno per un impatto devastante immediato, poi scartala nel mazzo degli scarti.'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
            {onEditCard && (
              <button
                onClick={() => onEditCard(card)}
                className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              >
                Modifica Carta
              </button>
            )}

            <button
              onClick={handleShare}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              {copied ? 'Copiata!' : 'Copia Testo'}
            </button>

            <button
              onClick={handlePrintSingle}
              className="ml-auto px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" /> Stampa
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
