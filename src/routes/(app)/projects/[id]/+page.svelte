<script lang="ts">
	import ProjectService from '../../../../services/ProjectService';
	import type { Project } from '../../../../types';
	import { Plus } from 'svelte-hero-icons';
	import UIButton from '$lib/UI/Button.svelte';
	import SystemStoryModal from '$lib/System/StoryModal.svelte';

	export let data;

	let isTaskModal = false;
	let project: Project | null = null;

	function handleOpenStoryModal() {
		isTaskModal = true;
	}

	async function loadData() {
		try {
			const response = await ProjectService.get(data.id);

			project = response.result;

			console.log('response', response);
		} catch (error: any) {
			console.log('error', error);
		}
	}

	function init() {
		loadData();
	}

	init();
</script>


<div class="px-6">
	<div class="flex justify-between items-center py-2 h-[68px]">
		<h1 class="text-3xl font-bold">{project?.name}</h1>
		<UIButton icon={Plus} title="Add story" on:click={handleOpenStoryModal} />
	</div>
</div>

<SystemStoryModal bind:showModal={isTaskModal} story={undefined} />