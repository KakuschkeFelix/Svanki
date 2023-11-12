import { deckStore } from '$lib/Store/Decks/DeckStore';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ data: { decks } }) => {
	if (decks.error) {
		throw error(500, decks.error);
	}
	deckStore.dispatch({ type: 'SET_DECK_NAMES_AND_IDS', payload: { ...decks.result } });
}) satisfies PageLoad;
