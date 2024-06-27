<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { toasts } from 'svelte-toasts';
	import { Priority, Status } from '../../types';
	import ProjectService from '../../services/ProjectService';
	import UserService from '../../services/UserService';
	import type { FormModel } from '../../services/StoryService';
	import StoryService from '../../services/StoryService';
	import UIInput from '$lib/UI/Input.svelte';
	import UIModal from '$lib/UI/Modal.svelte';
	import UISelect from '$lib/UI/Select.svelte';
	import UIGroup from '$lib/UI/Group.svelte';
	import UITextarea from '$lib/UI/Textarea.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	export let showModal = false;
	export let id: string | undefined = undefined;

	let form: FormModel = {
		name: '',
		description: '',
		priority: Priority.LOW,
		project: '',
		status: Status.TODO,
		owned_by: ''
	};

	let errors: Record<string, string> = {};

	const dispatch = createEventDispatcher();

	let options = {
		priority: [
			{ value: Priority.LOW, label: 'Low' },
			{ value: Priority.MEDIUM, label: 'Medium' },
			{ value: Priority.HIGH, label: 'High' }
		],
		status: [
			{ value: Status.TODO, label: 'To do' },
			{ value: Status.DOING, label: 'Doing' },
			{ value: Status.DONE, label: 'Done' }
		],
		project: [],
		owned_by: []
	};

	$: editMode = !!id;
	$: header = editMode ? 'Edit story' : 'Add story';

	async function onDelete(close: () => void) {
		if (id) {
			const response = await StoryService.delete(id);

			toasts.add({
				type: 'success',
				title: response.message,
				description: 'The story has been deleted successfully.',
				duration: 3000
			});

			close();
			dispatch('confirm');
		}
	}

	async function onConfirm(close: () => void) {
		try {
			if (!editMode) {
				const response = await StoryService.add(form);

				toasts.add({
					type: 'success',
					title: response.message,
					description: 'The story has been added successfully.',
					duration: 3000
				});
			} else if (id) {
				const response = await StoryService.edit(id, form);

				toasts.add({
					type: 'success',
					title: response.message,
					description: 'The story has been updated successfully.',
					duration: 3000
				});
			}

			close();
			dispatch('confirm');
		} catch (error: any) {
			const status = error?.response?.status;

			if (status == 422) {
				errors = error?.response?.data?.errors ?? {};
			}
		}
	}

	async function loadStory(id: string) {
		try {
			const response = await StoryService.get(id);

			form = response.result;
		} catch (error: any) {
			console.log('error', error);
		}

	}

	async function loadProjects() {
		try {
			const response = await ProjectService.list();

			options.project = response.result.map((project: any) => ({
				value: project._id,
				label: project.name
			}));
		} catch (error: any) {
			console.log('error', error);
		}
	}

	async function loadUsers() {
		try {
			const response = await UserService.list();

			options.owned_by = response.result.map((user: any) => ({
				value: user._id,
				label: `${user.first_name} ${user.last_name}`
			}));
		} catch (error: any) {
			console.log('error', error);
		}
	}

	loadProjects();
	loadUsers();

	function clear() {
		form = {
			name: '',
			description: '',
			priority: Priority.LOW,
			project: '',
			status: Status.TODO,
			owned_by: ''
		};
		errors = {};
	}

	function init() {
		if (editMode && id) loadStory(id);
	}
</script>

<UIModal bind:showModal={showModal} header={header} on:open={init} on:close={clear}>
	<UIGroup label="Name" error={errors['name']}>
		<UIInput bind:value={form.name} />
	</UIGroup>
	<UIGroup label="Description" error={errors['description']}>
		<UITextarea bind:value={form.description} />
	</UIGroup>
	<UIGroup label="Priority" error={errors['priority']}>
		<UISelect bind:value={form.priority} options={options.priority} />
	</UIGroup>
	<UIGroup label="Project" error={errors['project']}>
		<UISelect bind:value={form.project} options={options.project} />
	</UIGroup>
	<UIGroup label="Status" error={errors['status']}>
		<UISelect bind:value={form.status} options={options.status} />
	</UIGroup>
	<UIGroup label="Owner" error={errors['owned_by']}>
		<UISelect bind:value={form.owned_by} options={options.owned_by} />
	</UIGroup>

	<svelte:fragment slot="footer-left" let:close={close}>
		{#if editMode}
			<UIButton text="Delete" variant="primary" on:click={() => onDelete(close)} />
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="footer" let:close={close}>
		<UIButton text="Confirm" on:click={() => onConfirm(close)} />
		<UIButton text="Cancel" on:click={close} />
	</svelte:fragment>
</UIModal>