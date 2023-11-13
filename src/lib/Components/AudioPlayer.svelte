<script lang="ts">
	let audioElement: HTMLAudioElement;
	let volume = 1;

	function toggleAudio() {
		if (audioElement.paused) {
			audioElement.play();
		} else {
			audioElement.pause();
		}
	}

	function changeVolume() {
		audioElement.volume = volume;
	}
</script>

<audio bind:this={audioElement} style="display: none;">
	<slot name="source" />
</audio>
<button on:click={toggleAudio}>Toggle</button>
<input type="number" bind:value={volume} min="0" max="1" step="0.1" on:change={changeVolume} />
