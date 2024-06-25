<script lang="ts">
	import { PlusCircle } from 'svelte-hero-icons';
	import UIButton from '$lib/UI/Button.svelte';
</script>

<div class="px-6">
	<div class="flex items-center py-2 h-[68px]">
		<h1 class="text-3xl font-bold">Home</h1>
	</div>
	<UIButton variant="primary" text="Add project" iconSolid icon={PlusCircle} />
</div>