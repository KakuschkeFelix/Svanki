import { DeckService } from '$lib/Services/DeckService';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const deckService = DeckService.getInstance();
	return {
		decks: deckService.deckNamesAndIds()
	};
}) satisfies PageServerLoad;
