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
</div>