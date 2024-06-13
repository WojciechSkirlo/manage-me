<script>
	import '../app.css';
	import Sidebar from '$lib/System/Sidebar.svelte';
	import Header from '$lib/System/Header.svelte';
</script>

<div class="bg-gra-100">
	<div class="flex min-h-dvh main">
		<Sidebar />
		<div class="w-px bg-blue separator"></div>
		<main class="flex flex-col flex-1 bg-white">
			<Header />
			<slot />
		</main>

	</div>
</div>

<style>
    .main {
        background: #eaeaead6;
    }

    .separator {
        background: rgba(0, 0, 0, 0.18);
    }
</style>
