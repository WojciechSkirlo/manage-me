<script>
	import { createEventDispatcher } from 'svelte';
	import { Icon, UserCircle } from 'svelte-hero-icons';

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click');
	}
</script>

<button type="button" class="w-10 h-8 flex justify-center items-center outline-none" on:click={onClick}>
	<Icon src="{UserCircle}" solid class="w-6 h-6" />
</button>