<script>
	import Sidebar from '$lib/System/Sidebar.svelte';
	import Header from '$lib/System/Header.svelte';
</script>

<div class="bg-gra-100">
	<div class="flex min-h-dvh bg-stone-100">
		<Sidebar />
		<div class="w-px bg-blue separator"></div>
		<main class="flex flex-col flex-1 bg-white">
			<Header />
			<slot />
		</main>

	</div>
</div>

<style>
    .separator {
        background: rgba(0, 0, 0, 0.18);
    }
</style>
