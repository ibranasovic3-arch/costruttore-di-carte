import type { AbilityCard, CardCategory, CardType, Player } from '../types.ts';

export interface FilterOptions {
  category?: CardCategory | 'all';
  type?: CardType | 'all';
  searchQuery?: string;
  sortBy?: 'cost-asc' | 'cost-desc' | 'title' | 'default';
}

export function filterDeck(cards: AbilityCard[], options: FilterOptions = {}): AbilityCard[] {
  let result = [...cards];

  if (options.category && options.category !== 'all') {
    result = result.filter(card => card.category === options.category);
  }

  if (options.type && options.type !== 'all') {
    result = result.filter(card => card.type === options.type);
  }

  if (options.searchQuery && options.searchQuery.trim().length > 0) {
    const query = options.searchQuery.trim().toLowerCase();
    result = result.filter(card => 
      card.title.toLowerCase().includes(query) ||
      card.description.toLowerCase().includes(query) ||
      card.subtitle.toLowerCase().includes(query)
    );
  }

  if (options.sortBy) {
    switch (options.sortBy) {
      case 'cost-asc':
        result.sort((a, b) => a.cost - b.cost);
        break;
      case 'cost-desc':
        result.sort((a, b) => b.cost - a.cost);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'default':
      default:
        // keep original order
        break;
    }
  }

  return result;
}

export function paginateForPrint(cards: AbilityCard[], cardsPerPage = 9): AbilityCard[][] {
  const pages: AbilityCard[][] = [];
  for (let i = 0; i < cards.length; i += cardsPerPage) {
    pages.push(cards.slice(i, i + cardsPerPage));
  }
  return pages;
}

export function shuffleDeck<T>(deck: T[], seedRandom?: () => number): T[] {
  const copy = [...deck];
  const rand = seedRandom || Math.random;
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function validateCard(card: Partial<AbilityCard>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!card.title || card.title.trim().length < 2) {
    errors.push('Il titolo deve contenere almeno 2 caratteri.');
  }

  if (typeof card.cost !== 'number' || card.cost < 0 || card.cost > 5000) {
    errors.push('Il costo deve essere un valore numerico tra 0 e 5000.');
  }

  if (!card.description || card.description.trim().length < 5) {
    errors.push('La descrizione della regola deve contenere almeno 5 caratteri.');
  }

  if (!card.bannerColor || !/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(card.bannerColor)) {
    errors.push('Il colore del banner deve essere un codice HEX valido (es. #FFE500).');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function calculatePlayerAbilityBonus(
  player: Player,
  eventType: 'pass_go' | 'rent_due' | 'jail',
  baseValue: number
): { modifiedValue: number; notes: string[] } {
  let modifiedValue = baseValue;
  const notes: string[] = [];

  for (const card of player.activeCards) {
    if (eventType === 'pass_go') {
      if (card.id === 'il-direttore-della-banca') {
        notes.push('Direttore della Banca: +M 100 commissione');
        modifiedValue += 100;
      }
      if (card.id === 'turbo-passo-veloce') {
        notes.push('Sprint Turbo: stipendio raddoppiato a M 400');
        modifiedValue = 400;
      }
    } else if (eventType === 'rent_due') {
      if (card.id === 'immunita-totale-fitto') {
        notes.push('Immunità dal Fitto: affitto azzerato');
        modifiedValue = 0;
      }
    } else if (eventType === 'jail') {
      if (card.id === 'uscita-donore-prigione') {
        notes.push('Uscita d\'Onore: scarcerazione istantanea con M 100 bonus');
        modifiedValue = 100;
      }
    }
  }

  return { modifiedValue, notes };
}
