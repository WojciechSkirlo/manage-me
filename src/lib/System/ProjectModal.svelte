<script lang="ts">
	import UIInput from '$lib/UI/Input.svelte';
	import UIModal from '$lib/UI/Modal.svelte';
	import UIGroup from '$lib/UI/Group.svelte';
	import UITextarea from '$lib/UI/Textarea.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	export let showModal = false;

	interface FormModel {
		id?: string;
		name: string;
		description: string;
	}

	let form: FormModel = {
		name: '',
		description: ''
	};
</script>

<UIModal bind:showModal={showModal} header="Add project">
	<UIGroup label="Name">
		<UIInput bind:value={form.name} />
	</UIGroup>
	<UIGroup label="Description">
		<UITextarea bind:value={form.description} />
	</UIGroup>
	
	<svelte:fragment slot="footer" let:close={close}>
		<UIButton text="Confirm" on:click={close} />
		<UIButton text="Cancel" on:click={close} />
	</svelte:fragment>
</UIModal>