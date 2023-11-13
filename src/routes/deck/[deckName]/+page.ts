import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { deckStore } from '$lib/Store/Decks/DeckStore';

export const load = (async ({ parent }) => {
    const parentData = await parent();
    deckStore.dispatch({ type: 'SET_CURRENT_DECK', payload: { ...parentData.currentDeck } })
}) satisfies PageLoad;