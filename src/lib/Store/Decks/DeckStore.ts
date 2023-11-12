import type { AnkiDeckActionResult, DeckConfig } from '$lib/Types/Anki/Deck';
import { createActionMap, createSelector, createStore } from 'rx-svelte';

type DeckStoreActionsNames = 'SET_DECK_NAMES_AND_IDS' | 'SET_CURRENT_DECK_INFO' | 'SET_CURRENT_DECK_CONFIG';
type DeckStoreActionsPayloads = {
	SET_DECK_NAMES_AND_IDS: AnkiDeckActionResult['deckNamesAndIds'];
	SET_CURRENT_DECK_INFO: { name: string; id: number };
	SET_CURRENT_DECK_CONFIG: DeckConfig;
};

type DeckStoreState = {
	decks: {
		[deckName: string]: number;
	};
	currentDeck?: {
		name?: string;
		id?: number;
		config?: DeckConfig;
	};
};

const initialState: DeckStoreState = {
	decks: {},
	currentDeck: undefined
};

const actions = createActionMap<DeckStoreActionsNames, DeckStoreState, DeckStoreActionsPayloads>({
	SET_DECK_NAMES_AND_IDS: (state, payload) => ({
		...state,
		decks: payload
	}),
	SET_CURRENT_DECK_INFO: (state, payload) => ({
		...state,
		currentDeck: {
			name: payload.name,
			id: payload.id,
			config: state.currentDeck?.config
		}
	}),
	SET_CURRENT_DECK_CONFIG: (state, payload) => ({
		...state,
		currentDeck: {
			...state.currentDeck,
			config: payload
		}
	})
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

export const selectCurrentDeckConfig = createSelector<
	DeckStoreActionsNames,
	DeckStoreState,
	DeckConfig | undefined
>(deckStore, (state) => state.currentDeck?.config);

export const selectCurrentDeckInfo = createSelector<
	DeckStoreActionsNames,
	DeckStoreState,
	{ name?: string; id?: number }
>(deckStore, (state) => ({
	name: state.currentDeck?.name,
	id: state.currentDeck?.id
}));
