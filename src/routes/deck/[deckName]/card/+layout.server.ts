import { Base64Service } from "$lib/Services/Base64.service";
import { CardService } from "$lib/Services/CardService";
import { error } from "@sveltejs/kit";
import { getDueCards, getNewCards } from "../(queries)/queries";
import type { LayoutServerLoad } from "./$types";
import { shuffleArray } from "$lib/helpers";

export const load = (async ({ parent, params }) => {
    const { currentDeck } = await parent();
    const cardService = CardService.getInstance();
    const deckName = Base64Service.decode(params.deckName);

    const [newCards, dueCards] = await Promise.all([
        cardService.findCardsAndLimit(getNewCards(deckName), currentDeck.new_count),
        cardService.findCards(getDueCards(deckName)),
    ]);

    if (newCards.error || !newCards.result?.length) {
        throw error(500, "Error fetching new cards");
    }

    if (dueCards.error || !dueCards.result?.length) {
        throw error(500, "Error fetching due cards");
    }

    return {
        cards: shuffleArray([...newCards.result, ...dueCards.result]),
    };
}) satisfies LayoutServerLoad;