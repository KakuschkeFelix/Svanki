import { Base64Service } from '$lib/Services/Base64.service';
import { CardService } from '$lib/Services/CardService';
import { DeckService } from '$lib/Services/DeckService';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
    const deckName = Base64Service.decode(params.deckName);

    const newDeck = await parent().then(({ decks }) => {
        const output = Object.values(decks.result ?? []).find((deck) => deck.name === deckName
        )
        if (!output) {
            throw error(500, 'Deck not found');
        }
        return output;
    })

    return {
        currentDeck: newDeck,
    };
}) satisfies LayoutServerLoad;