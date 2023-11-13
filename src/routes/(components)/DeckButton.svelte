<script lang="ts">
	import { browser } from '$app/environment';
	import type { DeckInfo } from '$lib/Types/Anki/Deck';

	export let deck: DeckInfo;
</script>

<a
	href="/deck/{btoa(deck.name)}"
	class="btn variant-filled flex flex-nowrap space-x-2 w-min"
	data-sveltekit-preload-data="hover"
	><span>{deck.name}</span>
	<span class="badge variant-filled-tertiary"
		>{deck.new_count <= 100 ? deck.new_count : '100+'}</span
	>
	<span class="badge variant-filled-error"
		>{deck.learn_count <= 100 ? deck.learn_count : '100+'}</span
	>
	<span class="badge variant-filled-success"
		>{deck.review_count <= 100 ? deck.review_count : '100+'}</span
	>
</a>
