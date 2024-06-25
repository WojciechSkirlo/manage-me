<script lang="ts">
	export let nospace = false;
	export let label = '';
</script>

<div class={`flex ${nospace ? 'mb-0' : 'mb-4'}`}>
	{#if label}
		<label class="flex flex-col flex-1">
			<span class="text-text-secondary-dark text-sm">{label}</span>
			<slot />
		</label>
	{:else}
		<slot />
	{/if}
</div>