<script lang="ts">
	import { CardService } from '$lib/Services/CardService';
	import type { CardInfo } from '$lib/Types/Anki/Card';

	export let card: CardInfo;
	export let model: Record<string, any>;

	let showAnswer = false;
</script>

<div class="w-full h-full flex justify-center items-center">
	{#if !showAnswer}
		<div class="card flex flex-col justify-center text-center p-4 w-fit">
			<header class="card-header">
				<h2 class="text-xl font-bold">Question</h2>
			</header>
			<section class="p-4 text-5xl">
				{@html CardService.hydrateCard(card.fields, model['Front'])}
			</section>
			<footer class="card-footer">
				<button
					class="btn variant-filled-primary"
					on:click={() => (showAnswer = true)}
					on:keydown={() => (showAnswer = true)}>Turn Card</button
				>
			</footer>
		</div>
	{:else}
		<div class="card w-fit">
			<header class="card-header">
				<h2 class="text-xl font-bold">Question</h2>
			</header>
			<section class="p-4 text-2xl">
				{@html CardService.hydrateCard(card.fields, model['Back'])}
			</section>
			<footer class="card-footer">(footer)</footer>
		</div>
	{/if}
</div>
