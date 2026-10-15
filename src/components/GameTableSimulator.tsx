import React, { useState } from 'react';
import type { AbilityCard, Player } from '../types.ts';
import { MonopolyCard } from './MonopolyCard.tsx';
import { shuffleDeck, calculatePlayerAbilityBonus } from '../deck/deckLogic.ts';
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Coins, 
  ShieldAlert, 
  Zap, 
  Dices, 
  Award,
  ArrowRight
} from 'lucide-react';

interface GameTableSimulatorProps {
  deck: AbilityCard[];
  onInspectCard: (card: AbilityCard) => void;
}

const INITIAL_PLAYERS: Player[] = [
  { id: 'p1', name: 'Giocatore 1', token: 'Cilindro', color: '#EF4444', activeCards: [], cash: 1500 },
  { id: 'p2', name: 'Giocatore 2', token: 'Macchinina', color: '#3B82F6', activeCards: [], cash: 1500 },
  { id: 'p3', name: 'Giocatore 3', token: 'Fiasco', color: '#EAB308', activeCards: [], cash: 1500 },
  { id: 'p4', name: 'Giocatore 4', token: 'Fungo', color: '#10B981', activeCards: [], cash: 1500 },
];

export const GameTableSimulator: React.FC<GameTableSimulatorProps> = ({ deck, onInspectCard }) => {
  const [drawPile, setDrawPile] = useState<AbilityCard[]>(() => shuffleDeck(deck));
  const [discardPile, setDiscardPile] = useState<AbilityCard[]>([]);
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [activePlayerIdx, setActivePlayerIdx] = useState(0);
  const [lastDrawnCard, setLastDrawnCard] = useState<AbilityCard | null>(null);
  const [gameLog, setGameLog] = useState<string[]>([
    'Tavolo pronto! Mazzo mescolato con 24 Carte Abilità.',
  ]);

  const activePlayer = players[activePlayerIdx];

  const handleDrawCard = () => {
    if (drawPile.length === 0) {
      if (discardPile.length === 0) {
        addLog('Non ci sono più carte nel mazzo o negli scarti!');
        return;
      }
      // Reshuffle discard into draw pile
      const reshuffled = shuffleDeck(discardPile);
      setDrawPile(reshuffled.slice(1));
      setDiscardPile([]);
      const drawn = reshuffled[0];
      assignDrawn(drawn);
      addLog(`Mazzo rimescolato! ${activePlayer.name} ha pescato "${drawn.title}".`);
      return;
    }

    const drawn = drawPile[0];
    setDrawPile(drawPile.slice(1));
    assignDrawn(drawn);
    addLog(`${activePlayer.name} (${activePlayer.token}) ha pescato "${drawn.title}".`);
  };

  const assignDrawn = (card: AbilityCard) => {
    setLastDrawnCard(card);
    setPlayers(prev => prev.map((p, idx) => {
      if (idx === activePlayerIdx) {
        return { ...p, activeCards: [card, ...p.activeCards] };
      }
      return p;
    }));
  };

  const handleDiscardCard = (playerId: string, cardId: string) => {
    const p = players.find(x => x.id === playerId);
    const card = p?.activeCards.find(c => c.id === cardId);
    if (!card) return;

    setPlayers(prev => prev.map(pl => {
      if (pl.id === playerId) {
        return { ...pl, activeCards: pl.activeCards.filter(c => c.id !== cardId) };
      }
      return pl;
    }));

    setDiscardPile(prev => [card, ...prev]);
    addLog(`${p?.name} ha giocato/scartato "${card.title}".`);
  };

  const addLog = (msg: string) => {
    setGameLog(prev => [msg, ...prev.slice(0, 15)]);
  };

  const handleSimulatePassGo = () => {
    const bonus = calculatePlayerAbilityBonus(activePlayer, 'pass_go', 200);
    setPlayers(prev => prev.map((p, idx) => {
      if (idx === activePlayerIdx) {
        return { ...p, cash: p.cash + bonus.modifiedValue };
      }
      return p;
    }));

    if (bonus.notes.length > 0) {
      addLog(`[BONUS] ${activePlayer.name} passa dal VIA! Incassa M ${bonus.modifiedValue} (${bonus.notes.join(', ')})`);
    } else {
      addLog(`${activePlayer.name} passa dal VIA! Incassa i normali M 200.`);
    }
  };

  const handleSimulateRent = () => {
    const baseRent = 300;
    const bonus = calculatePlayerAbilityBonus(activePlayer, 'rent_due', baseRent);
    if (bonus.modifiedValue === 0) {
      addLog(`[DIFESA] ${activePlayer.name} doveva pagare M ${baseRent} di affitto ma l'abilità "${bonus.notes[0]}" lo azzera completamente!`);
    } else {
      setPlayers(prev => prev.map((p, idx) => {
        if (idx === activePlayerIdx) {
          return { ...p, cash: Math.max(0, p.cash - baseRent) };
        }
        return p;
      }));
      addLog(`${activePlayer.name} ha pagato M ${baseRent} di affitto standard.`);
    }
  };

  const handleSimulateJail = () => {
    const bonus = calculatePlayerAbilityBonus(activePlayer, 'jail', 0);
    if (bonus.modifiedValue > 0) {
      setPlayers(prev => prev.map((p, idx) => {
        if (idx === activePlayerIdx) {
          return { ...p, cash: p.cash + bonus.modifiedValue };
        }
        return p;
      }));
      addLog(`[SCARCERAZIONE] ${activePlayer.name} usa "${bonus.notes[0]}" ed evita la Prigione intascando M ${bonus.modifiedValue}!`);
    } else {
      addLog(`${activePlayer.name} finisce in Prigione! (Nessuna abilità difensiva attiva).`);
    }
  };

  const handleResetTable = () => {
    setDrawPile(shuffleDeck(deck));
    setDiscardPile([]);
    setPlayers(INITIAL_PLAYERS);
    setLastDrawnCard(null);
    setGameLog(['Tavolo resettato! Mazzo di carte abilità pronto.']);
  };

  return (
    <div className="space-y-6" data-testid="game-table-simulator">
      {/* Top Banner / Table Controls */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white font-['Outfit'] flex items-center gap-2">
            <Dices className="w-6 h-6 text-amber-400" /> Tavolo da Gioco Interattivo
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Usa questo assistente durante le tue partite a Monopoly per pescare e applicare gli effetti delle carte abilità in tempo reale!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetTable}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Mescola / Reset Mazzo
          </button>
        </div>
      </div>

      {/* Main Table Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Deck Draw Pile & Discard Pile */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col items-center justify-between space-y-6 text-center">
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
              Mazzo di Pesca ({drawPile.length} rimaste)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Turno di: <span className="font-bold text-amber-400">{activePlayer.name} ({activePlayer.token})</span>
            </p>
          </div>

          {/* Interactive 3D Deck Card */}
          <div className="relative group cursor-pointer" onClick={handleDrawCard}>
            {drawPile.length > 2 && (
              <div className="absolute top-2 left-2 w-[170px] h-[270px] bg-emerald-950 rounded-lg border-2 border-amber-400/40 opacity-40 -rotate-3" />
            )}
            {drawPile.length > 1 && (
              <div className="absolute top-1 left-1 w-[170px] h-[270px] bg-emerald-950 rounded-lg border-2 border-amber-400/40 opacity-70 rotate-2" />
            )}
            
            {drawPile.length > 0 ? (
              <div className="relative transition-transform duration-200 group-hover:-translate-y-2 group-active:translate-y-0">
                <MonopolyCard card={drawPile[0]} size="sm" showBack={true} />
                <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/10 rounded-lg transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full shadow-lg transition-opacity">
                    PESCA ORA!
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-[170px] h-[270px] rounded-lg border-2 border-dashed border-slate-700 flex flex-col items-center justify-center p-4 text-slate-500">
                <span className="text-xs font-bold">Mazzo Vuoto</span>
                <button
                  onClick={handleResetTable}
                  className="mt-2 text-xs text-amber-400 underline font-semibold"
                >
                  Rimescola scarti
                </button>
              </div>
            )}
          </div>

          {/* Player Switcher */}
          <div className="w-full">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Seleziona Giocatore di Turno:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {players.map((pl, idx) => (
                <button
                  key={pl.id}
                  onClick={() => setActivePlayerIdx(idx)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                    activePlayerIdx === idx 
                      ? 'ring-2 ring-amber-400 text-white bg-slate-800' 
                      : 'bg-slate-950/60 text-slate-400 hover:text-slate-200'
                  }`}
                  style={{ borderLeft: `4px solid ${pl.color}` }}
                >
                  {pl.name.split(' ')[1] || pl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Trigger Simulations */}
          <div className="w-full pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Simula Azioni di Tabellone:
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={handleSimulatePassGo}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Coins className="w-3 h-3" /> Passa dal VIA!
              </button>
              <button
                onClick={handleSimulateRent}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <ShieldAlert className="w-3 h-3" /> Paga Fitto
              </button>
              <button
                onClick={handleSimulateJail}
                className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Zap className="w-3 h-3" /> Prigione
              </button>
            </div>
          </div>
        </div>

        {/* Center / Right Columns: 4 Players Hands & Active Abilities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {players.map((pl, pIdx) => {
              const isActive = activePlayerIdx === pIdx;
              return (
                <div
                  key={pl.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isActive 
                      ? 'bg-slate-900 border-amber-400/80 shadow-lg shadow-amber-500/10' 
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: pl.color }} 
                      />
                      <span className="font-bold text-sm text-white font-['Outfit']">
                        {pl.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {pl.token}
                      </span>
                    </div>

                    <div className="text-xs font-mono font-bold text-amber-400">
                      M {pl.cash}
                    </div>
                  </div>

                  {/* Active Cards List */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                      <span>Carte Abilità Attive ({pl.activeCards.length}):</span>
                    </div>

                    {pl.activeCards.length === 0 ? (
                      <div className="py-4 text-center text-xs text-slate-500 italic bg-slate-950/40 rounded-lg border border-dashed border-slate-800">
                        Nessuna abilità attiva. Pesca una carta!
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {pl.activeCards.map(c => (
                          <div
                            key={c.id}
                            className="p-2 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2 hover:border-slate-700 transition-colors"
                          >
                            <button
                              onClick={() => onInspectCard(c)}
                              className="text-left flex-1 truncate text-xs font-bold text-slate-200 hover:text-amber-400 transition-colors"
                            >
                              {c.title}
                            </button>
                            <span 
                              className="w-2.5 h-2.5 rounded-full shrink-0" 
                              style={{ backgroundColor: c.bannerColor }} 
                              title={c.category}
                            />
                            <button
                              onClick={() => handleDiscardCard(pl.id, c.id)}
                              title="Scarta questa carta"
                              className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Action Log */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" /> Registro Azioni di Gioco
            </h4>
            <div className="space-y-1 font-mono text-xs max-h-36 overflow-y-auto">
              {gameLog.map((log, idx) => (
                <div key={idx} className="text-slate-300 flex items-start gap-1.5">
                  <span className="text-slate-600">›</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
