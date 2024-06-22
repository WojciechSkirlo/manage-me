<script>
	import SystemSidebar from '$lib/System/Sidebar.svelte';
	import SystemHeader from '$lib/System/Header.svelte';
</script>

<div class="flex min-h-dvh bg-stone-100">
	<SystemSidebar />
	<div class="w-px separator"></div>
	<main class="flex flex-col flex-1 bg-white">
		<SystemHeader />
		<slot />
	</main>
</div>

<style>
    .separator {
        background: rgba(0, 0, 0, 0.18);
    }
</style>
