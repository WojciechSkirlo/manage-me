<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Folder, Icon } from 'svelte-hero-icons';

	export let variant: 'primary' | 'secondary' | 'outline' = 'outline';
	export let icon: typeof Folder | undefined = undefined;
	export let text: string = '';
	export let fill = false;

	$: variantClasses = variant === 'primary' ? 'bg-red text-white' : variant === 'secondary' ? 'text-text-secondary' : 'text-text-secondary';
	$: fillClasses = fill ? 'w-full' : 'w-10';

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click');
	}
</script>

<button type="button"
				class={`h-8 flex rounded-md justify-center items-center outline-none ${variantClasses} ${fillClasses}`}
				on:click={onClick}>
	{#if icon}
		<Icon src="{icon}" solid class="w-5 h-5" />
	{/if}
	{#if text}
		<span class="uppercase font-medium">{text}</span>
	{/if}
</button>