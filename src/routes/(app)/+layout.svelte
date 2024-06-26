<script lang="ts">
	import SystemSidebar from '$lib/System/Sidebar.svelte';
	import SystemHeader from '$lib/System/Header.svelte';
</script>

<div class="flex min-h-dvh blur-[30%] bg-[#EAEAEAD6] dark:bg-[#000000A1]">
	<SystemSidebar />
	<div class="w-px separator"></div>
	<main class="flex flex-col flex-1 bg-white dark:bg-[#28282880]">
		<SystemHeader />
		<slot />
	</main>
</div>

<style>
    .separator {
        background: rgba(0, 0, 0, 0.18);
    }
</style>
