<script lang="ts">
	import { Plus } from 'svelte-hero-icons';
	import type { Story } from '../../../types';
	import StoryService from '../../../services/StoryService';
	import UIButton from '$lib/UI/Button.svelte';
	import UITable from '$lib/UI/Table.svelte';
	import SystemStoryModal from '$lib/System/StoryModal.svelte';

	let isTaskModal = false;
	let storyId: string | undefined = undefined;

	function handleOpenStoryModal(e: CustomEvent) {
		storyId = e.detail;
		isTaskModal = true;
	}

	let columns = [
		{ name: 'Name', key: 'name' },
		{ name: 'Project', key: 'project.name' },
		{ name: 'Priority', key: 'priority' },
		{ name: 'Created at', key: 'created_at' },
		{ name: 'Status', key: 'status' },
		{ name: 'Owner', key: 'owned_by.email' }
	];

	let stories: Story[] = [];

	$: toDoStories = stories.filter((story: Story) => story.status === 'todo');
	$: doingStories = stories.filter((story: Story) => story.status === 'doing');
	$: doneStories = stories.filter((story: Story) => story.status === 'done');

	async function loadStories() {
		try {
			const response = await StoryService.list();

			stories = response.result;
		} catch (error: any) {
			console.log('error', error);
		}
	}

	function init() {
		loadStories();
	}

	init();
</script>

<div class="px-6 flex flex-col">
	<div class="flex justify-between items-center py-2 h-[68px]">
		<h1 class="text-3xl font-bold">Stories</h1>
		<UIButton icon={Plus} title="Add story" on:click={handleOpenStoryModal} />
	</div>

	<h2 class="mb-3 text-text-secondary font-semibold">Todo</h2>
	<UITable columns={columns} data={toDoStories} on:click={handleOpenStoryModal} />

	<h2 class="mb-3 mt-5 text-text-secondary font-medium">Doing</h2>
	<UITable columns={columns} data={doingStories} on:click={handleOpenStoryModal} />

	<h2 class="mb-3 mt-5 text-text-secondary font-medium">Done</h2>
	<UITable columns={columns} data={doneStories} on:click={handleOpenStoryModal} />
</div>

<SystemStoryModal bind:showModal={isTaskModal} id={storyId} on:confirm={loadStories} />