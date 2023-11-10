import { deckStore } from '$lib/Store/Decks/DeckStore';
import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
	deckStore.dispatch({ type: 'SET_DECK_NAMES_AND_IDS', payload: { ...data.decks.result } });
	return data;
}) satisfies PageLoad;
