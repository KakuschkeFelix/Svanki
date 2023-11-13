import { deckStore } from "$lib/Store/Decks/DeckStore";
import { createSelector } from "rx-svelte";

export const selectAllDecks = createSelector(deckStore, (state) => state.decks);