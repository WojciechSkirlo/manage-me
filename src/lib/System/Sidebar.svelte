<script lang="ts">
	import { page } from '$app/stores';
	import {
		Bell,
		CalendarDays,
		CheckCircle,
		Cog6Tooth,
		Folder,
		Icon,
		Inbox,
		ViewfinderCircle,
		Plus,
		PlusCircle,
		StopCircle
	} from 'svelte-hero-icons';
	import type { Project } from '../../types';
	import ProjectService from '../../services/ProjectService';
	import UIButton from '$lib/UI/Button.svelte';
	import SystemProjectModal from '$lib/System/ProjectModal.svelte';
	import SystemTaskModal from '$lib/System/TaskModal.svelte';

	let currentPath = '';
	let showProjectModal = false;
	let showTaskModal = false;

	page.subscribe(($page) => {
		currentPath = $page.url.pathname;
	});

	let items = [
		{ name: 'Home', icon: ViewfinderCircle, path: '/' },
		{ name: 'Inbox', icon: Inbox, path: '/' },
		{ name: 'Today', icon: CheckCircle, path: '/' },
		{ name: 'Upcoming', icon: CalendarDays, path: '/' },
	];

	let projects: Project[] = [];
	let selectedProject: Project | undefined;

	function handleOpenProjectModal(e: Event, project?: Project) {
		e.preventDefault();

		selectedProject = project;
		showProjectModal = true;
	}

	function handleOpenTaskModal() {
		showTaskModal = true;
	}

	async function loadProjects() {
		try {
			const response = await ProjectService.list();

			projects = response.result;
		} catch (error: any) {
			console.log('error', error);
		}
	}

	function init() {
		loadProjects();
	}

	init();
</script>

<div>
	<div class="flex h-full flex-col w-64 relative sidebar">
		<div class="h-13 flex justify-end items-center px-3">
			<UIButton icon={Bell} />
		</div>
		<div class="flex-1 px-3 flex flex-col gap-2">
			<div class="h-9 flex items-center">
				<button
					class="flex items-center gap-1 text-vibrant-pink dark:text-vibrant-pink-dark p-1 font-semibold text-[13px] outline-none"
					on:click={handleOpenTaskModal}>
					<Icon src="{PlusCircle}" solid class="w-6 h-6" />
					<span class="dark:text-text-primary-dark">Add task</span>
				</button>
			</div>
			<nav>
				<ul>
					{#each items as item}
						<li>
							<a data-sveltekit-preload-data="tap" href={item.path}
								 class={`h-8 px-2 py-1.5 flex items-center rounded-[5px] justify-between`}>
								<div class="flex items-center gap-2">
									<Icon src="{item.icon}" class="w-4 h-4 text-vibrant-pink dark:text-vibrant-pink-dark" />
									<span class="mt-px dark:text-text-primary-dark">{item.name}</span>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="flex flex-col gap-1">
				<div
					class="h-7 text-text-secondary dark:text-text-secondary-dark justify-between gap-2 px-2 py-1 flex outline-none items-center mt-2">
					<span class="text-xs font-bold dark:text-text-primary-dark">My Projects</span>
					<button on:click={handleOpenProjectModal}>
						<Icon src="{Plus}" class="w-4 h-4 dark:text-text-primary-dark" />
					</button>
				</div>
				<div>
					<ul class="flex flex-col gap-1">
						{#each projects as project (project._id)}
							<li>
								<a data-sveltekit-preload-data="tap" href={`/projects/${project._id}`}
									 class={`h-8 px-2 py-1.5 flex items-center rounded-[5px] justify-between ${currentPath === `/projects/${project._id}` ? 'bg-fills-secondary' : ''}`}>
									<div class="flex justify-between flex-1 gap-2">
										<div class="flex items-center gap-2">
											<Icon src="{Folder}" class="w-4 h-4 text-vibrant-pink dark:text-vibrant-pink-dark" />
											<span class="mt-px dark:text-text-primary-dark">{project.name}</span>
										</div>

										<button type="button" on:click={(event) => handleOpenProjectModal(event, project)}>
											<Icon src="{Cog6Tooth}" solid class="w-4 h-4 text-text-secondary dark:text-text-primary-dark" />
										</button>
									</div>
								</a>
							</li>
						{/each}
						{#if projects.length === 0}
							<li>
								<div class="h-8 px-2 py-1.5 flex items-center rounded-[5px] justify-between">
									<div class="flex items-center gap-2">
										<Icon src="{StopCircle}" class="w-4 h-4 text-vibrant-pink dark:text-vibrant-pink-dark" />
										<span class="mt-px dark:text-text-primary-dark">No projects</span>
									</div>
								</div>
							</li>
						{/if}
					</ul>
				</div>
			</div>
		</div>
	</div>

	<SystemProjectModal bind:showModal={showProjectModal} project={selectedProject} on:confirm={loadProjects} />
	<SystemTaskModal bind:showModal={showTaskModal} />
</div>

<style>
    .sidebar::after {
        content: "";
        position: absolute;
        width: 5px;
        background: linear-gradient(270deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
        opacity: 0.05;
        bottom: 0;
        top: 0;
        right: 0;
    }
</style>