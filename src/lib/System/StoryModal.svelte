<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Story } from '../../types';
	import { Priority, Status } from '../../types';
	import { toasts } from 'svelte-toasts';
	import type { FormModel } from '../../services/StoryService';
	import StoryService from '../../services/StoryService';
	import UIInput from '$lib/UI/Input.svelte';
	import UIModal from '$lib/UI/Modal.svelte';
	import UISelect from '$lib/UI/Select.svelte';
	import UIGroup from '$lib/UI/Group.svelte';
	import UITextarea from '$lib/UI/Textarea.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	export let showModal = false;
	export let story: Story | undefined = undefined;

	let form: FormModel = {
		name: '',
		description: '',
		priority: Priority.LOW,
		project: null,
		status: Status.TODO,
		owned_by: null
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
		]
	};

	$: editMode = !!story?._id;
	$: header = editMode ? 'Edit story' : 'Add story';

	async function onConfirm() {
		try {
			if (!editMode) {
				const response = await StoryService.add(form);

				toasts.add({
					type: 'success',
					title: response.message,
					description: 'The project has been added successfully.',
					duration: 3000
				});
			} else if (story) {
				const response = await StoryService.edit(story?._id, form);

				toasts.add({
					type: 'success',
					title: response.message,
					description: 'The project has been updated successfully.',
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

	function clear() {
		console.log('clear');
		form = {
			name: '',
			description: '',
			priority: Priority.LOW,
			project: null,
			status: Status.TODO,
			owned_by: null
		};
		errors = {};
	}

	function init() {
		// form = {
		// 	name: project?.name ?? '',
		// 	description: project?.description ?? ''
		// };
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
		<UISelect />
	</UIGroup>
	<UIGroup label="Status" error={errors['status']}>
		<UISelect bind:value={form.status} options={options.status} />
	</UIGroup>
	<UIGroup label="Owner" error={errors['owner']}>
		<UISelect />
	</UIGroup>

	<svelte:fragment slot="footer" let:close={close}>
		<UIButton text="Confirm" on:click={onConfirm} />
		<UIButton text="Cancel" on:click={close} />
	</svelte:fragment>
</UIModal>