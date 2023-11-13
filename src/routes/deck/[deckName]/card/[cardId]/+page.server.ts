import { CardService } from '$lib/Services/CardService';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const cardService = CardService.getInstance();
    return {
        card: cardService.cardsInfo([Number(params.cardId)]),
    };
}) satisfies PageServerLoad;