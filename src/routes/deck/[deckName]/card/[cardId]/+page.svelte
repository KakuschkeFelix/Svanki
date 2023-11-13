<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import AnkiCard from './(components)/AnkiCard.svelte';

	export let data: PageData;
	const selectedModel = Object.keys(data.models)[0];
</script>

<AnkiCard
	card={data.card}
	model={data.models[selectedModel]}
	questionField={data.question[selectedModel]}
	answerField={data.answer[selectedModel]}
/>
<a href="/deck/{$page.params.deckName}/card/{data.nextCard}" class="btn variant-filled">Next</a>
