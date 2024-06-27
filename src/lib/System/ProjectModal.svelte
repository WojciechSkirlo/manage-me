<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { toasts } from 'svelte-toasts';
	import type { FormModel } from '../../services/ProjectService';
	import ProjectService from '../../services/ProjectService';
	import type { Project } from '../../types';
	import UIInput from '$lib/UI/Input.svelte';
	import UIModal from '$lib/UI/Modal.svelte';
	import UIGroup from '$lib/UI/Group.svelte';
	import UITextarea from '$lib/UI/Textarea.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	export let showModal = false;
	export let project: Project | undefined;

	let form: FormModel = {
		name: '',
		description: ''
	};

	let errors: Record<string, string> = {};

	const dispatch = createEventDispatcher();

	$: editMode = !!project?._id;
	$: header = editMode ? 'Edit project' : 'Add project';

	async function onDelete(close: () => void) {
		if (project) {
			const response = await ProjectService.delete(project._id);

			toasts.add({
				type: 'success',
				title: response.message,
				description: 'The project has been deleted successfully.',
				duration: 3000
			});

			close();
			dispatch('confirm');
		}
	}

	async function onConfirm(close: () => void) {
		try {
			if (!editMode) {
				const response = await ProjectService.add(form);

				toasts.add({
					type: 'success',
					title: response.message,
					description: 'The project has been added successfully.',
					duration: 3000
				});
			} else if (project) {
				const response = await ProjectService.edit(project?._id, form);

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
		form = {
			name: '',
			description: ''
		};
		errors = {};
	}

	function init() {
		form = {
			name: project?.name ?? '',
			description: project?.description ?? ''
		};
	}
</script>

<UIModal bind:showModal={showModal} header={header} on:open={init} on:close={clear}>
	<UIGroup label="Name" error={errors['name']}>
		<UIInput bind:value={form.name} />
	</UIGroup>
	<UIGroup label="Description" error={errors['description']}>
		<UITextarea bind:value={form.description} />
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