import { DeckService } from '$lib/Services/DeckService';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    const deckService = DeckService.getInstance();
    const deckNames = await deckService.deckNames();
    if (deckNames.error) {
        throw error(500, deckNames.error);
    }
    if (!deckNames.result) {
        throw error(500, 'Deck names result is undefined');
    }
    return {
        decks: deckService.getDeckStats(deckNames.result)
    }
}) satisfies LayoutServerLoad;