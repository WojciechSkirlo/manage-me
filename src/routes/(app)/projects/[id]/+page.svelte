<script lang="ts">
	import ProjectService from '../../../../services/ProjectService';
	import type { Project } from '../../../../types';

	export let data;

	$: pageId = data.id;

	let project: Project | null = null;

	async function loadData(id: string) {
		try {
			const response = await ProjectService.get(id);

			project = response.result;

			console.log('response', response);
		} catch (error: any) {
			console.log('error', error);
		}
	}

	function init() {
		loadData(pageId);
	}

	$: {
		if (pageId) init();
	}
</script>


<div class="px-6">
	<div class="flex justify-between items-center py-2 h-[68px]">
		<h1 class="text-3xl font-bold">{project?.name}</h1>
	</div>
	<div class="gap-6 pt-6 grid grid-cols-3">
		<div class="flex flex-col">
			<div class="flex items-center h-8 mb-1">
				<h2 class="text-lg font-semibold">
					To do
					<span class="font-normal text-text-secondary">4</span>
				</h2>
			</div>
			<div class="bg-vibrant-pink rounded-lg h-1 w-full"></div>
		</div>
		<div class="flex flex-col">
			<div class="flex items-center h-8 mb-1">
				<h2 class="text-lg font-semibold">
					Doing
					<span class="font-normal text-text-secondary">4</span>
				</h2>
			</div>
			<div class="bg-vibrant-yellow rounded-lg h-1 w-full"></div>
		</div>
		<div class="flex flex-col">
			<div class="flex items-center h-8 mb-1">
				<h2 class="text-lg font-semibold">
					Done
					<span class="font-normal text-text-secondary">4</span>
				</h2>
			</div>
			<div class="bg-vibrant-green rounded-lg h-1 w-full"></div>
		</div>
	</div>
</div>