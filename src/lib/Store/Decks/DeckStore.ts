import type { AnkiDeckActionResult, DeckConfig } from '$lib/Types/Anki/Deck';
import { createActionMap, createSelector, createStore } from 'rx-svelte';

type DeckStoreActionsNames = 'SET_DECK_OVERVIEWS' | 'SET_CURRENT_DECK';
type DeckStoreActionsPayloads = {
	SET_DECK_OVERVIEWS: AnkiDeckActionResult['getDeckStats'];
	SET_CURRENT_DECK: DeckConfig;
};

type DeckStoreState = {
	decks: {
		[deckId: number]: {
			deck_id: number;
			name: string;
			new_count: number;
			learn_count: number;
			review_count: number;
			total_in_deck: number;
		};
	};
	currentDeck?: DeckConfig;
};

const initialState: DeckStoreState = {
	decks: {},
	currentDeck: undefined
};

const actions = createActionMap<DeckStoreActionsNames, DeckStoreState, DeckStoreActionsPayloads>({
	SET_DECK_OVERVIEWS: (state, payload) => ({
		...state,
		decks: payload
	}),
	SET_CURRENT_DECK: (state, payload) => ({
		...state,
		currentDeck: payload
	})
});

export const deckStore = createStore<
	DeckStoreActionsNames,
	DeckStoreState,
	DeckStoreActionsPayloads
>(initialState, actions);