<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let type = 'text';

	function onInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		value = (e.target as HTMLInputElement).value;
	}
</script>

<input {type} value={value}
			 class="border-b border-fills-primary transition-colors focus:border-b-pink px-0 py-2 outline-none"
			 placeholder={placeholder} on:input={onInput} />