<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import _ from 'lodash';

	interface Column {
		name: string;
		key: string;
	}

	export let columns: Column[] = [];
	export let data: any[] = [];

	const dispatch = createEventDispatcher();

	function onClick(id: string) {
		dispatch('click', id);
	}
</script>

<div class="flex flex-col border border-fills-primary rounded-lg p-2 pt-3">
	<div class="-m-1.5">
		<div class="p-1.5 min-w-full inline-block align-middle">
			<div class="">
				<table class="min-w-full divide-y divide-fills-primary">
					<thead>
					<tr>
						{#each columns as col}
							<th scope="col"
									class="px-4 py-3 text-start text-xs font-medium text-text-primary uppercase">{col.name}</th>
						{/each}
						<th scope="col" class="px-4 py-3 text-end text-xs font-medium text-gray-500 uppercase">Actions</th>
					</tr>
					</thead>
					<tbody class="divide-y divide-fills-primary">
					{#each data as row}
						<tr>
							{#each columns as col}
								<td
									class="px-4 py-4 whitespace-nowrap text-sm font-medium text-text-secondary">{_.get(row, col.key)}</td>
							{/each}
							<td class="px-4 py-4 whitespace-nowrap text-end text-sm font-medium">
								<button type="button"
												class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-vibrant-pink disabled:opacity-50 disabled:pointer-events-none"
												on:click={() => onClick(row._id)}>
									Edit
								</button>
							</td>
						</tr>
					{/each}
					{#if data.length === 0}
						<tr>
							<td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-text-secondary"
									colspan={columns.length + 1}>
								No data available
							</td>
						</tr>
					{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>