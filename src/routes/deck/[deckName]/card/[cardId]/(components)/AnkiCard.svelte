<script lang="ts">
	import { CardService } from '$lib/Services/CardService';
	import type { SvankiCardInfo } from '$lib/Types/Anki/Card';

	export let card: { Front: string; Back: string } = { Front: '', Back: '' };
	export let placeholder: boolean = false;

	let showAnswer = false;
</script>

<div class="w-full h-full flex justify-center items-center">
	<div class="card w-fit">
		<header class="card-header">
			<h2 class="text-xl font-bold">
				{#if placeholder}
					<div class="placeholder animate-pulse h-6 w-[12ch]" />
				{:else if !showAnswer}
					Question
				{:else}
					Answer
				{/if}
			</h2>
		</header>
		<section class="p-4 flex flex-col justify-center text-center">
			{#if placeholder}
				<div class="flex flex-col space-y-2">
					<div class="placeholder animate-pulse h-8 w-[12ch]" />
					<div class="flex space-x-2">
						<div class="placeholder animate-pulse h-8 w-[15ch]" />
						<div class="placeholder animate-pulse h-8 w-[12ch]" />
					</div>
				</div>
			{:else if !showAnswer}
				<div class="text-4xl flex flex-col justify-center">
					{@html card.Front}
				</div>
			{:else}
				<div class="text-2xl">
					{@html card.Back}
				</div>
			{/if}
		</section>
		<footer
			class="card-footer flex flex-row items-center space-x-4 w-full text-center justify-center"
		>
			{#if placeholder}
				<div class="placeholder animate-pulse h-12 w-[12ch]" />
			{:else if !showAnswer}
				<button
					class="btn variant-filled-primary"
					on:click={() => (showAnswer = true)}
					on:keydown={() => (showAnswer = true)}>Turn Card</button
				>
			{:else}
				<slot name="answer" />
			{/if}
		</footer>
	</div>
</div>
