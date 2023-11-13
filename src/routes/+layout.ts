import type { LayoutLoad } from './$types';
import { deckStore } from '$lib/Store/Decks/DeckStore';
import { error } from '@sveltejs/kit';

export const load = (async ({ data: { decks } }) => {
    if (decks.error) {
        throw error(500, decks.error);
    }
    deckStore.dispatch({ type: 'SET_DECK_OVERVIEWS', payload: { ...decks.result } });
}) satisfies LayoutLoad;