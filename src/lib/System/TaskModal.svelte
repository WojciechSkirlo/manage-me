<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { toasts } from 'svelte-toasts';
	import TaskService, { type FormModel } from '../../services/TaskService';
	import StoryService from '../../services/StoryService';
	import UserService from '../../services/UserService';
	import { Priority, Status } from '../../types';
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
		story: '',
		taskExecutionTime: '',
		status: Status.TODO,
		assigned_to: ''
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
		story: [],
		assigned_to: []
	};

	$: editMode = !!id;
	$: header = editMode ? 'Edit task' : 'Add task';

	async function onDelete(close: () => void) {
		if (id) {
			const response = await TaskService.delete(id);

			toasts.add({
				type: 'success',
				title: response.message,
				description: 'The task has been deleted successfully.',
				duration: 3000
			});

			close();
			dispatch('confirm');
		}
	}

	async function onConfirm(close: () => void) {
		try {
			if (!editMode) {
				const response = await TaskService.add(form);

				toasts.add({
					type: 'success',
					title: response.message,
					description: 'The task has been added successfully.',
					duration: 3000
				});
			} else if (id) {
				const response = await TaskService.edit(id, form);

				toasts.add({
					type: 'success',
					title: response.message,
					description: 'The task has been updated successfully.',
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

	async function loadTask(id: string) {
		try {
			const response = await TaskService.get(id);

			form = response.result;
		} catch (error: any) {
			console.log('error', error);
		}
	}

	async function loadUsers() {
		try {
			const response = await UserService.list();

			options.assigned_to = response.result.map((user: any) => ({
				value: user._id,
				label: `${user.first_name} ${user.last_name}`
			}));
		} catch (error: any) {
			console.log('error', error);
		}
	}

	async function loadStories() {
		try {
			const response = await StoryService.list();

			options.story = response.result.map((story: any) => ({
				value: story._id,
				label: story.name
			}));
		} catch (error: any) {
			console.log('error', error);
		}
	}

	loadUsers();
	loadStories();

	function clear() {
		form = {
			name: '',
			description: '',
			priority: Priority.LOW,
			story: '',
			taskExecutionTime: '',
			status: Status.TODO,
			assigned_to: ''
		};
		errors = {};
	}

	function init() {
		if (editMode && id) loadTask(id);
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
	<UIGroup label="Story" error={errors['story']}>
		<UISelect bind:value={form.story} options={options.story} />
	</UIGroup>
	<UIGroup label="Task execution time" error={errors['taskExecutionTime']}>
		<UIInput bind:value={form.taskExecutionTime} type="number" />
	</UIGroup>
	<UIGroup label="Status" error={errors['status']}>
		<UISelect bind:value={form.status} options={options.status} />
	</UIGroup>
	<UIGroup label="Assigned to" error={errors['assigned_to']}>
		<UISelect bind:value={form.assigned_to} options={options.assigned_to} />
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