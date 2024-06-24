<script lang="ts">
	import UIInput from '$lib/UI/Input.svelte';

	export let data;
</script>


<div class="px-6">
	<div class=" flex items-center py-2 h-[68px]">
		<h1 class="text-3xl font-bold">What’s My SERP</h1>
	</div>
	<UIInput />
	{data.id}
</div>