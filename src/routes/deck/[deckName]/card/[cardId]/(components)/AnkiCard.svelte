<script lang="ts">
	import { CardService } from '$lib/Services/CardService';
	import type { CardInfo } from '$lib/Types/Anki/Card';

	export let card: CardInfo;
	export let model: Record<string, any>;
	export let questionField: string;
	export let answerField: string;

	$: fields = Object.entries(card.fields).sort(([, a], [, b]) => a.order - b.order);
</script>

<!-- {#each fields as [field, fieldConfig]}
	<div class="field">
		<h3>{field}</h3>
		<p>{JSON.stringify(fieldConfig)}</p>
	</div>
{/each} -->
{@html CardService.hydrateCard(card.fields, model['Front'])}
<br />
<br />
<br />
{@html CardService.hydrateCard(card.fields, model['Back'])}
