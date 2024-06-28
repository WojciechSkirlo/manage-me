<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Task } from '../../types';

	export let data: Task;

	$: assigned_to = `${data.assigned_to.first_name} ${data.assigned_to.last_name}`;
	$: priorityClasses = data.priority === 'high' ? 'text-vibrant-pink' : data.priority === 'medium' ? 'text-vibrant-yellow' : 'text-vibrant-green';

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click', data._id);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div class="p-3 rounded-lg border border-fills-primary bg-white dark:bg-fills-primary drop-shadow cursor-pointer" aria-pressed="false"
		 on:click={onClick}>
	<div class="mb-1 flex gap-2 justify-between">
		<h1 class="text-lg truncate">{data.name}</h1>
		<div class={`uppercase text-[10px] ${priorityClasses}`}>{data.priority}</div>
	</div>
	<p class="text-text-secondary dark:text-text-primary-dark truncate mb-2">{data.description}</p>
	<span class="text-pink">{assigned_to}</span>
</div>