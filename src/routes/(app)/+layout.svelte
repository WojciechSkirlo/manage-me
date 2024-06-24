<script lang="ts">
	import SystemSidebar from '$lib/System/Sidebar.svelte';
	import SystemHeader from '$lib/System/Header.svelte';
</script>

<div class="flex min-h-dvh blur-[30%] bg-[#EAEAEAD6] dark:bg-[#00000073]">
	<SystemSidebar />
	<div class="w-px separator"></div>
	<main class="flex flex-col flex-1 bg-white dark:bg-gray-800">
		<SystemHeader />
		<slot />
	</main>
</div>

<style>
    .separator {
        background: rgba(0, 0, 0, 0.18);
    }
</style>
