<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click');
	}
</script>

<li>
	<button class="p-2" on:click={onClick}>
		<slot />
	</button>
</li>