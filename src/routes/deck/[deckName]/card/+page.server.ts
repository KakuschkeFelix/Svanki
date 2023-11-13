import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, params }) => {
    const { cards: [cardId] } = await parent();
    throw redirect(301, `/deck/${params.deckName}/card/${cardId}`);
}) satisfies PageServerLoad;