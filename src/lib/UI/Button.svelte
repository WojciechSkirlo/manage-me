<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Folder, Icon } from 'svelte-hero-icons';

	export let variant: 'primary' | 'secondary' | 'outline' = 'outline';
	export let icon: typeof Folder | undefined = undefined;
	export let text: string = '';
	export let fill = false;
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let iconSolid = false;

	$: variantClasses = variant === 'primary' ? 'bg-red text-white' : variant === 'secondary' ? 'text-text-secondary' : 'text-text-secondary dark:text-text-primary-dark';
	$: fillClasses = fill ? 'w-full' : 'min-w-[40px]';

	const dispatch = createEventDispatcher();

	function onClick() {
		dispatch('click');
	}
</script>

<button {type}
				class={`h-8 flex px-2 rounded-md justify-center items-center outline-none ${variantClasses} ${fillClasses}`}
				on:click={onClick}>
	{#if icon}
		<Icon src="{icon}" solid={iconSolid} class="w-5 h-5" />
	{/if}
	{#if text}
		<span class={`uppercase mt-px font-medium ${icon ? 'ms-2' : ''}`}>{text}</span>
	{/if}
</button>