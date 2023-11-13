<script lang="ts">
	import { goto } from '$app/navigation';
	import DeckButton from './(components)/DeckButton.svelte';
	import { selectAllDecks } from './(selectors)/selectors';
</script>

<article class="p-4 h-full w-full">
	<div class="card p-4 max-h-[600px] space-y-4 w-min">
		<h3 class="h3" data-toc-ignore>Your decks</h3>
		<div class="max-h-[400px] overflow-auto flex flex-col space-y-4 p-4">
			{#each Object.values($selectAllDecks) as deck (deck.deck_id)}
				<DeckButton {deck} />
			{/each}
			{#each Object.values($selectAllDecks) as deck (deck.deck_id)}
				<DeckButton {deck} />
			{/each}
			{#each Object.values($selectAllDecks) as deck (deck.deck_id)}
				<DeckButton {deck} />
			{/each}
			{#each Object.values($selectAllDecks) as deck (deck.deck_id)}
				<DeckButton {deck} />
			{/each}
		</div>
	</div>
</article>
