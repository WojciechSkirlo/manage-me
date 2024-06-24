<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let type = 'text';

	function onInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		value = (e.target as HTMLInputElement).value;
	}
</script>

<input {type} {value} {placeholder}
			 class="border-b flex-1 border-fills-primary transition-colors focus:border-b-pink px-0 py-2 outline-none"
			 on:input={onInput} />