<script lang="ts">
	import { page } from '$app/stores';
	import {
		Bell,
		CalendarDays,
		CheckCircle,
		Folder,
		Icon,
		Inbox,
		MagnifyingGlass,
		Plus,
		PlusCircle,
		Squares2x2
	} from 'svelte-hero-icons';
	import UIBadge from '$lib/UI/Badge.svelte';
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
		{ name: 'Search', icon: MagnifyingGlass, path: '/' },
		{ name: 'Inbox', icon: Inbox, path: '/' },
		{ name: 'Today', icon: CheckCircle, path: '/' },
		{ name: 'Upcoming', icon: CalendarDays, path: '/' },
		{ name: 'Filters & Labels', icon: Squares2x2, path: '/' }
	];

	let projects = [
		{ id: 1, name: 'Home Projects' },
		{ id: 2, name: 'Pixify Shop' }
	];

	function handleOpenProjectModal() {
		showProjectModal = true;
	}

	function handleOpenTaskModal() {
		showTaskModal = true;
	}
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
					<span class="mt-px">Add task</span>
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
									<span class="mt-px">{item.name}</span>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<div class="flex flex-col gap-1">
				<div
					class="h-7 text-text-secondary dark:text-text-secondary-dark justify-between gap-2 px-2 py-1 flex outline-none items-center mt-2">
					<span class="text-xs font-bold">My Projects</span>
					<button on:click={handleOpenProjectModal}>
						<Icon src="{Plus}" class="w-4 h-4 text-vibrant1" />
					</button>
				</div>
				<div>
					<ul class="flex flex-col gap-1">
						{#each projects as project}
							<li>
								<a data-sveltekit-preload-data="tap" href={`/projects/${project.id}`}
									 class={`h-8 px-2 py-1.5 flex items-center rounded-[5px] justify-between ${currentPath === `/projects/${project.id}` ? 'bg-fills-secondary' : ''}`}>
									<div class="flex items-center gap-2">
										<Icon src="{Folder}" class="w-4 h-4 text-vibrant-pink dark:text-vibrant-pink-dark" />
										<span class="mt-px">{project.name}</span>
									</div>
									<UIBadge>5</UIBadge>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- Project modal -->
	<SystemProjectModal bind:showModal={showProjectModal} />

	<!-- Add task modal -->
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