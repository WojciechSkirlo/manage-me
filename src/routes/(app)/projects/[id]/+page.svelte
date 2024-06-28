<script lang="ts">
	import ProjectService from '../../../../services/ProjectService';
	import { fetchProjectTasks, tasks, toggleTaskModal } from '../../../../stores/task';
	import type { Project } from '../../../../types';
	import UITask from '$lib/UI/Task.svelte';

	export let data;

	let project: Project | null = null;

	$: pageId = data.id;
	$: toDoTasks = $tasks.filter(task => task.status === 'todo');
	$: doingTasks = $tasks.filter(task => task.status === 'doing');
	$: doneTasks = $tasks.filter(task => task.status === 'done');

	$: {
		if (pageId) init();
	}

	function handleOpenTaskModal(task: CustomEvent) {
		toggleTaskModal(task.detail);
	}

	async function loadProjectData(id: string) {
		try {
			const response = await ProjectService.get(id);

			project = response.result;
		} catch (error: any) {
			console.log('error', error);
		}
	}

	function init() {
		loadProjectData(pageId);
		fetchProjectTasks(pageId);
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
					<span class="font-normal text-text-secondary dark:text-text-primary-dark">{toDoTasks.length}</span>
				</h2>
			</div>
			<div class="bg-vibrant-pink rounded-lg h-1 w-full"></div>
			<div class="flex flex-col gap-3 py-3">
				{#each toDoTasks as task (task._id)}
					<UITask data={task} on:click={handleOpenTaskModal} />
				{/each}
			</div>
		</div>
		<div class="flex flex-col">
			<div class="flex items-center h-8 mb-1">
				<h2 class="text-lg font-semibold">
					Doing
					<span class="font-normal text-text-secondary dark:text-text-primary-dark">{doingTasks.length}</span>
				</h2>
			</div>
			<div class="bg-vibrant-yellow rounded-lg h-1 w-full"></div>
			<div class="flex flex-col gap-3 py-3">
				{#each doingTasks as task (task._id)}
					<UITask data={task} on:click={handleOpenTaskModal} />
				{/each}
			</div>
		</div>
		<div class="flex flex-col">
			<div class="flex items-center h-8 mb-1">
				<h2 class="text-lg font-semibold">
					Done
					<span class="font-normal text-text-secondary dark:text-text-primary-dark">{doneTasks.length}</span>
				</h2>
			</div>
			<div class="bg-vibrant-green rounded-lg h-1 w-full"></div>
			<div class="flex flex-col gap-3 py-3">
				{#each doneTasks as task (task._id)}
					<UITask data={task} on:click={handleOpenTaskModal} />
				{/each}
			</div>
		</div>
	</div>
</div>