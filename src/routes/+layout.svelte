<script>
    import "../app.css";
    import Sidebar from "$lib/System/Sidebar.svelte";
</script>

<div class="bg-gray-200">
    <div class="flex min-h-dvh main">
        <Sidebar/>
        <div class="w-px bg-blue separator"></div>
        <main class="flex flex-col flex-1 bg-white">
            <header class="h-13">

            </header>
            <slot/>
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
