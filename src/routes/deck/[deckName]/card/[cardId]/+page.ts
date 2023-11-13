import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ data: { card } }) => {
    if (card.error || !card.result?.length) {
        throw error(500, 'Error fetching card');
    }
    return {
        card: card.result[0],
    };
}) satisfies PageLoad;