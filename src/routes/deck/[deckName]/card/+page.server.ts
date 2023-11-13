import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, params }) => {
    throw redirect(301, `/deck/${params.deckName}`);
}) satisfies PageServerLoad;