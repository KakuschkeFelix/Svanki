import type { AnkiCardActionResult } from '$lib/Types/Anki/Card';
import { createActionMap, createStore } from 'rx-svelte';

type CardStoreActionsNames = 'SET_TODAYS_CARDS' | 'SET_CARDS_INFO';
type CardStoreActionsPayloads = {
	SET_TODAYS_CARDS: number[];
	SET_CARDS_INFO: AnkiCardActionResult['cardsInfo'];
};

type CardStoreState = {
	todaysCards: number[];
	cardsInfo: AnkiCardActionResult['cardsInfo'];
};

const initialState: CardStoreState = {
	todaysCards: [],
	cardsInfo: []
};

const actions = createActionMap<CardStoreActionsNames, CardStoreState, CardStoreActionsPayloads>({
	SET_TODAYS_CARDS: (state, payload) => {
		return {
			...state,
			todaysCards: payload
		};
	},
	SET_CARDS_INFO: (state, payload) => {
		return {
			...state,
			cardsInfo: payload
		};
	}
});

export const cardStore = createStore<
	CardStoreActionsNames,
	CardStoreState,
	CardStoreActionsPayloads
>(initialState, actions);

export const selectTodaysCards = (state: CardStoreState) => state.todaysCards;
export const selectCardsInfo = (state: CardStoreState) => state.cardsInfo;
