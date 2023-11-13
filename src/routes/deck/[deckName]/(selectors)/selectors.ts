import { deckStore } from "$lib/Store/Decks/DeckStore";
import { createSelector } from "rx-svelte";

export const currentDeckId = createSelector(deckStore, (state) => state.currentDeck!.id);

export function selectDeckName(id: number) {
    console.log('selectDeckName', id);
    return createSelector(deckStore, (state) => state.decks[id]?.name);
}
export const test = createSelector(deckStore, (state) => state);