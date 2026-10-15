import test from 'node:test';
import assert from 'node:assert/strict';
import { filterDeck, paginateForPrint, shuffleDeck, validateCard, calculatePlayerAbilityBonus } from './deckLogic.ts';
import { INITIAL_DECK } from './deckData.ts';
import type { AbilityCard, Player } from '../types.ts';

test('INITIAL_DECK contains the original reference card "TUTTI I CONTRATTI"', () => {
  const original = INITIAL_DECK.find(c => c.id === 'tutti-i-contratti');
  assert.ok(original, 'Original card should be present');
  assert.equal(original?.cost, 375);
  assert.equal(original?.title, 'TUTTI I CONTRATTI');
  assert.equal(original?.bannerColor, '#FFE500');
  assert.equal(original?.isOriginalReference, true);
});

test('INITIAL_DECK has complete unique cards including new expansion cards', () => {
  assert.ok(INITIAL_DECK.length >= 24, 'Deck should contain full set of cards');
  const ids = new Set(INITIAL_DECK.map(c => c.id));
  assert.equal(ids.size, INITIAL_DECK.length, 'All card IDs must be unique');

  // Check that newly requested cards are present
  assert.ok(INITIAL_DECK.some(c => c.id === 'condono-edilizio'), 'Condono Edilizio must be in deck');
  assert.ok(INITIAL_DECK.some(c => c.id === 'ecobonus-110'), 'Ecobonus 110% must be in deck');
  assert.ok(INITIAL_DECK.some(c => c.id === 'monopolio-istantaneo'), 'Monopolio Istantaneo must be in deck');
});

test('filterDeck filters by category correctly', () => {
  const contrattiCards = filterDeck(INITIAL_DECK, { category: 'contratti' });
  assert.ok(contrattiCards.length > 0);
  assert.ok(contrattiCards.every(c => c.category === 'contratti'));
});

test('filterDeck searches in title and description', () => {
  const searchResults = filterDeck(INITIAL_DECK, { searchQuery: 'banca' });
  assert.ok(searchResults.length > 0);
  assert.ok(searchResults.some(c => c.title.toLowerCase().includes('banca') || c.description.toLowerCase().includes('banca')));
});

test('filterDeck sorts by cost ascending and descending', () => {
  const sortedAsc = filterDeck(INITIAL_DECK, { sortBy: 'cost-asc' });
  for (let i = 0; i < sortedAsc.length - 1; i++) {
    assert.ok(sortedAsc[i].cost <= sortedAsc[i + 1].cost);
  }

  const sortedDesc = filterDeck(INITIAL_DECK, { sortBy: 'cost-desc' });
  for (let i = 0; i < sortedDesc.length - 1; i++) {
    assert.ok(sortedDesc[i].cost >= sortedDesc[i + 1].cost);
  }
});

test('paginateForPrint divides deck into 9-card sheets for A4 printing', () => {
  const pages = paginateForPrint(INITIAL_DECK, 9);
  const expectedPages = Math.ceil(INITIAL_DECK.length / 9);
  assert.equal(pages.length, expectedPages);
  assert.equal(pages[0].length, 9);
  assert.equal(pages[1].length, 9);
});

test('card corner style defaults and preserves squared and rounded options', () => {
  const cardSquared: AbilityCard = {
    id: 'test-squared',
    title: 'CARTA RETRO',
    cost: 100,
    type: 'permanente',
    category: 'contratti',
    subtitle: 'Sottotitolo',
    description: 'Effetto a squadro classico',
    bannerColor: '#FFE500',
    illustrationKey: 'juggling-contracts',
    cornerStyle: 'squared',
  };
  const cardRounded: AbilityCard = {
    ...cardSquared,
    id: 'test-rounded',
    cornerStyle: 'rounded',
  };
  assert.equal(cardSquared.cornerStyle, 'squared');
  assert.equal(cardRounded.cornerStyle, 'rounded');
});

test('shuffleDeck preserves all cards without duplicates', () => {
  const shuffled = shuffleDeck(INITIAL_DECK);
  assert.equal(shuffled.length, INITIAL_DECK.length);
  const setOriginal = new Set(INITIAL_DECK.map(c => c.id));
  const setShuffled = new Set(shuffled.map(c => c.id));
  assert.equal(setOriginal.size, setShuffled.size);
});

test('validateCard rejects invalid cards and accepts valid cards', () => {
  const invalidCard = { title: '', cost: -10, description: '' };
  const resInvalid = validateCard(invalidCard);
  assert.equal(resInvalid.valid, false);
  assert.ok(resInvalid.errors.length >= 3);

  const validCard: Partial<AbilityCard> = {
    title: 'SUPER POTERE',
    cost: 300,
    description: 'Effetto incredibile sui dadi.',
    bannerColor: '#3B82F6',
    customSvg: '<svg viewBox="0 0 240 200"><circle cx="120" cy="120" r="70" fill="#FFF"/></svg>',
    aiPrompt: 'Un dado d\'oro con ali angeliche',
  };
  const resValid = validateCard(validCard);
  assert.equal(resValid.valid, true);
  assert.equal(resValid.errors.length, 0);
});

test('cards with AI icons retain customSvg or customImageUrl upon filtering', () => {
  const customAiCard: AbilityCard = {
    id: 'ai-card-1',
    title: 'COLPO DEL SECOLO',
    cost: 400,
    type: 'istantanea',
    category: 'intrighi',
    subtitle: 'Azione Immediata - Gioca nel tuo turno.',
    description: 'Ruba un albergo rosso e incassa M 200.',
    bannerColor: '#DC2626',
    illustrationKey: 'juggling-contracts',
    customSvg: '<svg viewBox="0 0 240 200"></svg>',
    aiPrompt: 'Mr. Monopoly che ruba un albergo',
    custom: true,
  };

  const filtered = filterDeck([customAiCard, ...INITIAL_DECK], { searchQuery: 'secolo' });
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].customSvg, '<svg viewBox="0 0 240 200"></svg>');
  assert.equal(filtered[0].aiPrompt, 'Mr. Monopoly che ruba un albergo');
});

test('calculatePlayerAbilityBonus applies active card perks', () => {
  const mockPlayer: Player = {
    id: 'p1',
    name: 'Mario',
    token: 'Cappello',
    color: '#EF4444',
    cash: 1500,
    activeCards: [INITIAL_DECK[0], INITIAL_DECK.find(c => c.id === 'il-direttore-della-banca')!],
  };

  const passGoResult = calculatePlayerAbilityBonus(mockPlayer, 'pass_go', 200);
  assert.equal(passGoResult.modifiedValue, 300); // 200 + 100 commission
  assert.ok(passGoResult.notes.length > 0);
});
