import type { AnkiDeckActionResult } from '$lib/Types/Anki/Deck';
import { createActionMap, createSelector, createStore } from 'rx-svelte';

type DeckStoreActionsNames = 'SET_DECK_NAMES_AND_IDS';
type DeckStoreActionsPayloads = {
	SET_DECK_NAMES_AND_IDS: AnkiDeckActionResult['deckNamesAndIds'];
};

type DeckStoreState = {
	decks: {
		[deckName: string]: number;
	};
};

const initialState: DeckStoreState = {
	decks: {}
};

const actions = createActionMap<DeckStoreActionsNames, DeckStoreState, DeckStoreActionsPayloads>({
	SET_DECK_NAMES_AND_IDS: (state, payload) => {
		return {
			...state,
			decks: payload
		};
	}
});

export const deckStore = createStore<
	DeckStoreActionsNames,
	DeckStoreState,
	DeckStoreActionsPayloads
>(initialState, actions);

export const selectAllDecks = createSelector<
	DeckStoreActionsNames,
	DeckStoreState,
	DeckStoreState['decks']
>(deckStore, (state) => state.decks);
