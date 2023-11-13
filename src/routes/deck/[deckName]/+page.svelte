<script lang="ts">
	import type { PageData } from './$types';
	import MaterialSymbolsArrowBack from '~icons/material-symbols/arrow-back';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

<article class="w-full h-full">
	<nav class="w-full p-4 bg-surface-800">
		<AppBar>
			<svelte:fragment slot="lead">
				<a
					href="/"
					class="btn variant-filled flex flex-nowrap space-x-2 w-min"
					data-sveltekit-preload-data="hover"
					><MaterialSymbolsArrowBack />
					<span>Back</span>
				</a>
			</svelte:fragment>
			<h1 class="font-bold text-4xl">{data.currentDeck.name}</h1>
		</AppBar>
	</nav>
</article>
