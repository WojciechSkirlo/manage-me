<script lang="ts">
	import { UserCircle } from 'svelte-hero-icons';
	import UIButton from '$lib/UI/Button.svelte';

	let open = false;

	function handleClick() {
		open = !open;
	}
</script>

<div class="relative">
	<UIButton icon={UserCircle} iconSolid={true} on:click={handleClick} />

	{#if open}
		<div class="w-52 absolute right-0 top-full rounded-[5px] bg-fills-primary">
			<ul class="p-2">
				<slot />
			</ul>
		</div>
	{/if}
</div>
