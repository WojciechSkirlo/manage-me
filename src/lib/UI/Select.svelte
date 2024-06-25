<script lang="ts">
	interface Option {
		value: string;
		label: string;
	}

	export let value = '';
	export let options: Option[] = [];
</script>


<select
	bind:value={value}
	class="bg-white outline-none border-b border-fills-primary text-sm block w-full px-0 py-2">
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>