<script lang="ts">
	export let value = '';
	export let type = 'text';
	export let placeholder: string | null = null;
	export let autocomplete: string | null = null;

	function onInput(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		value = (e.target as HTMLInputElement).value;
	}
</script>

<input {type} {value} {placeholder} {autocomplete}
			 class="border-b flex-1 border-fills-primary bg-transparent transition-colors focus:border-b-pink px-0 py-2 outline-none"
			 on:input={onInput} />