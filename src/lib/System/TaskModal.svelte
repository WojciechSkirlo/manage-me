<script lang="ts">
	import UIInput from '$lib/UI/Input.svelte';
	import UIModal from '$lib/UI/Modal.svelte';
	import UISelect from '$lib/UI/Select.svelte';
	import UIGroup from '$lib/UI/Group.svelte';
	import UITextarea from '$lib/UI/Textarea.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	export let showModal = false;

	interface FormModel {
		id?: string;
		name: string;
		description: string;
		priority: Priority;
		story: string;
		taskExecutionTime: string;
		status: Status;
		user: string;
	}

	enum Priority {
		Low = 'low',
		Medium = 'medium',
		High = 'high'
	}

	enum Status {
		Todo = 'todo',
		Doing = 'doing',
		Done = 'done'
	}

	let form: FormModel = {
		name: '',
		description: '',
		priority: Priority.Low,
		story: '',
		taskExecutionTime: '',
		status: Status.Todo,
		user: ''
	};

	let options = {
		priority: [
			{ value: Priority.Low, label: 'Low' },
			{ value: Priority.Medium, label: 'Medium' },
			{ value: Priority.High, label: 'High' }
		],
		status: [
			{ value: Status.Todo, label: 'To do' },
			{ value: Status.Doing, label: 'Doing' },
			{ value: Status.Done, label: 'Done' }
		]
	};

	function confirm() {
		console.log('Task added', form);
	}
</script>

<UIModal bind:showModal={showModal} header="Add task">
	<UIGroup label="Name">
		<UIInput bind:value={form.name} />
	</UIGroup>
	<UIGroup label="Description">
		<UITextarea bind:value={form.description} />
	</UIGroup>
	<UIGroup label="Priority">
		<UISelect bind:value={form.priority} options={options.priority} />
	</UIGroup>
	<UIGroup label="Story">
		<UISelect />
	</UIGroup>
	<UIGroup label="Task execution time">
		<UIInput type="number" />
	</UIGroup>
	<UIGroup label="Status">
		<UISelect bind:value={form.status} options={options.status} />
	</UIGroup>
	<UIGroup label="User">
		<UISelect />
	</UIGroup>

	<svelte:fragment slot="footer" let:close={close}>
		<UIButton text="Confirm" on:click={confirm} />
		<UIButton text="Cancel" on:click={close} />
	</svelte:fragment>
</UIModal>