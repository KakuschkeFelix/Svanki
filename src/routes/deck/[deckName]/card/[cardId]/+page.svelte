<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import AnkiCard from './(components)/AnkiCard.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { CardService } from '$lib/Services/CardService';

	export let data: PageData;
	const selectedModel = Object.keys(data.models)[0];

	const cardService = CardService.getInstance();

	const { form, enhance } = superForm(data.answerForm);
</script>

{#await Promise.all( [cardService.generateCardWithMedia(data.card.fields, data.models[selectedModel]['Front']), cardService.generateCardWithMedia(data.card.fields, data.models[selectedModel]['Back'])] )}
	<AnkiCard placeholder={true} />
{:then [front, back]}
	<AnkiCard card={{ Front: front.template, Back: back.template }}>
		<svelte:fragment slot="answer">
			<form method="post" use:enhance>
				<input type="hidden" name="answer" value="1" />
				<button class="btn variant-filled-error" type="submit">Again</button>
			</form>
			<form method="post" use:enhance>
				<input type="hidden" name="answer" value="2" />
				<button class="btn variant-filled-warning" type="submit">Hard</button>
			</form>
			<form method="post" use:enhance>
				<input type="hidden" name="answer" value="3" />
				<button class="btn variant-filled-primary" type="submit">Good</button>
			</form>
			<form method="post" use:enhance>
				<input type="hidden" name="answer" value="4" />
				<button class="btn variant-filled-success" type="submit">Easy</button>
			</form>
		</svelte:fragment>
	</AnkiCard>
{/await}
