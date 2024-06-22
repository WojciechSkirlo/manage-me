<script>
	import { Sun } from 'svelte-hero-icons';
	import UIDropdown from '$lib/UI/Dropdown.svelte';
	import UIButton from '$lib/UI/Button.svelte';
</script>

<header class="h-13 px-4 py-2 flex text-text-secondary font-semibold items-center justify-between">
	<div>
		<span>UI Flip  /  Clients  /  What’s My SERP</span>
	</div>
	<div class="flex gap-2">
		<UIButton icon={Sun} />
		<UIDropdown />
	</div>
</header>