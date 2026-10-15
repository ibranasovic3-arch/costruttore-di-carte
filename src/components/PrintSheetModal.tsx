import React, { useState } from 'react';
import type { AbilityCard } from '../types.ts';
import { MonopolyCard } from './MonopolyCard.tsx';
import { paginateForPrint } from '../deck/deckLogic.ts';
import { X, Printer, Layers, Eye, CheckCircle2 } from 'lucide-react';

interface PrintSheetModalProps {
  cards: AbilityCard[];
  onClose: () => void;
}

export const PrintSheetModal: React.FC<PrintSheetModalProps> = ({ cards, onClose }) => {
  const [printMode, setPrintMode] = useState<'front' | 'back' | 'both'>('front');
  const [showCropMarks, setShowCropMarks] = useState(true);
  const [printCornerStyle, setPrintCornerStyle] = useState<'squared' | 'rounded'>('squared');

  const pages = paginateForPrint(cards, 9);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      data-testid="print-sheet-modal"
    >
      <div 
        className="relative w-full max-w-6xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[94vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Controls (Hidden during print) */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 print:hidden">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
              <Printer className="w-5 h-5 text-amber-400" /> Studio di Stampa A4 (Print & Play)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              9 carte per foglio standard A4 con crocini di taglio ad alta precisione ({cards.length} carte totali = {pages.length} fogli)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Mode selection */}
            <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setPrintMode('front')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  printMode === 'front' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Fronte Carte
              </button>
              <button
                onClick={() => setPrintMode('back')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  printMode === 'back' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Retro Carte
              </button>
              <button
                onClick={() => setPrintMode('both')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  printMode === 'both' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Fronte + Retro
              </button>
            </div>

            {/* Corner style cut selection */}
            <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs">
              <button
                onClick={() => setPrintCornerStyle('squared')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  printCornerStyle === 'squared' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="Taglio a squadro 90° fedele all'originale Monopoly"
              >
                <span className="w-2.5 h-2.5 border border-current rounded-none inline-block" />
                A Squadro
              </button>
              <button
                onClick={() => setPrintCornerStyle('rounded')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors ${
                  printCornerStyle === 'rounded' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
                title="Fustella angoli arrotondati"
              >
                <span className="w-2.5 h-2.5 border border-current rounded-sm inline-block" />
                Angoli Tondi
              </button>
            </div>

            {/* Crop marks toggle */}
            <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showCropMarks}
                onChange={e => setShowCropMarks(e.target.checked)}
                className="rounded border-slate-700 text-amber-500 focus:ring-0"
              />
              Crocini di Taglio
            </label>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4" /> Stampa / Salva in PDF
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Chiudi finestra stampa"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Sheets Preview Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-950 flex flex-col items-center space-y-12 print:p-0 print:m-0 print:bg-white print:overflow-visible">
          {pages.map((pageCards, pageIdx) => (
            <React.Fragment key={pageIdx}>
              {/* Front Sheet */}
              {(printMode === 'front' || printMode === 'both') && (
                <div 
                  className="bg-white p-6 rounded-lg shadow-2xl border border-slate-300 flex flex-col items-center print:shadow-none print:border-none print:p-0 print:m-0 print:page-break-after-always"
                  style={{
                    width: '210mm',
                    minHeight: '297mm',
                    boxSizing: 'border-box',
                  }}
                >
                  <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-dashed border-slate-300 text-[10px] text-slate-500 print:hidden">
                    <span>FOGLIO {pageIdx + 1} DI {pages.length} - FRONTE</span>
                    <span>MONOPOLY CARTE ABILITÀ - EDIZIONE COMPLETA</span>
                  </div>

                  {/* 3x3 Card Grid */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-1">
                    {pageCards.map((card) => (
                      <div key={card.id} className="relative group">
                        {showCropMarks && (
                          <>
                            {/* Cutting guide corners */}
                            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-black/40 pointer-events-none" />
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-black/40 pointer-events-none" />
                            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-black/40 pointer-events-none" />
                            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-black/40 pointer-events-none" />
                          </>
                        )}
                        <MonopolyCard card={card} size="sm" forceFront={true} cornerStyle={printCornerStyle} />
                      </div>
                    ))}
                    {/* Fill blank slots if last page has fewer than 9 cards */}
                    {Array.from({ length: 9 - pageCards.length }).map((_, idx) => (
                      <div 
                        key={`empty-${idx}`} 
                        className={`w-[180px] h-[280px] border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-xs font-mono ${printCornerStyle === 'squared' ? 'rounded-none' : 'rounded-lg'}`}
                      >
                        Slot Vuoto
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Back Sheet */}
              {(printMode === 'back' || printMode === 'both') && (
                <div 
                  className="bg-white p-6 rounded-lg shadow-2xl border border-slate-300 flex flex-col items-center print:shadow-none print:border-none print:p-0 print:m-0 print:page-break-after-always"
                  style={{
                    width: '210mm',
                    minHeight: '297mm',
                    boxSizing: 'border-box',
                  }}
                >
                  <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-dashed border-slate-300 text-[10px] text-slate-500 print:hidden">
                    <span>FOGLIO {pageIdx + 1} DI {pages.length} - RETRO (DORSO)</span>
                    <span>MONOPOLY CARTE ABILITÀ</span>
                  </div>

                  {/* 3x3 Card Grid Backs */}
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-1">
                    {pageCards.map((card) => (
                      <div key={`back-${card.id}`} className="relative">
                        {showCropMarks && (
                          <>
                            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-black/40 pointer-events-none" />
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-black/40 pointer-events-none" />
                            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-black/40 pointer-events-none" />
                            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-black/40 pointer-events-none" />
                          </>
                        )}
                        <MonopolyCard card={card} size="sm" showBack={true} cornerStyle={printCornerStyle} />
                      </div>
                    ))}
                    {Array.from({ length: 9 - pageCards.length }).map((_, idx) => (
                      <div 
                        key={`empty-back-${idx}`} 
                        className="w-[170px] h-[270px] border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-300 text-xs font-mono"
                      >
                        Slot Vuoto
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

      </div>
    </div>
  );
};
