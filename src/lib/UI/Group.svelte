<script lang="ts">
	export let nospace = false;
	export let label = '';
	export let error = '';
</script>

<div class={`flex flex-col ${nospace ? 'mb-0' : 'mb-4'}`}>
	<div class="flex flex-col">
		{#if label}
			<label class="flex flex-col flex-1">
				<span class="text-text-secondary dark:text-text-primary-dark text-sm">{label}</span>
				<slot />
			</label>
		{:else}
			<slot />
		{/if}
	</div>
	{#if error}
		<span class="text-red text-sm mt-2 block">{error}</span>
	{/if}
</div>
