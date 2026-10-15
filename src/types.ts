export type CardType = 'permanente' | 'istantanea' | 'reazione' | 'vittoria';

export type CardCategory = 
  | 'contratti' 
  | 'affitti' 
  | 'finanza' 
  | 'edilizia' 
  | 'trasporti' 
  | 'intrighi'
  | 'vittoria';

export interface AbilityCard {
  id: string;
  title: string;
  cost: number;
  type: CardType;
  category: CardCategory;
  subtitle: string;
  description: string;
  bannerColor: string;
  bannerTextColor?: string;
  illustrationKey: string;
  rarity?: 'comune' | 'rara' | 'leggendaria';
  isOriginalReference?: boolean;
  custom?: boolean;
  customSvg?: string;
  customImageUrl?: string;
  aiPrompt?: string;
  cornerStyle?: 'squared' | 'rounded';
}

export interface Player {
  id: string;
  name: string;
  token: string;
  color: string;
  activeCards: AbilityCard[];
  cash: number;
}
