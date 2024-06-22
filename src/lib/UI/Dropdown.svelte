<script>
	// import { goto } from '@sveltejs/kit/navigation';
	import { goto } from '$app/navigation';
	import Button from '$lib/UI/Button.svelte';

	let open = false;

	function handleClick() {
		open = !open;
	}

	function handleLogout() {
		goto('/sign-in')
		console.log('Logout');
	}
</script>

<div class="relative">
	<Button on:click={handleClick} />

	{#if open}
		<div class="w-44 absolute right-0 top-full rounded-[5px] bg-stone-100">
			<ul class="p-2">
				<li class="p-2 cursor-pointer">Profile</li>
				<li class="p-2 cursor-pointer" on:click={handleLogout}>Logout</li>
			</ul>
		</div>
	{/if}
</div>
