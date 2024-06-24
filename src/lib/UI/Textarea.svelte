<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let rows = 4;

	function onInput(e: Event & { currentTarget: EventTarget & HTMLTextAreaElement }) {
		value = (e.target as HTMLTextAreaElement).value;
	}
</script>

<textarea class="border-b flex-1 border-fills-primary transition-colors focus:border-b-pink px-0 py-2 outline-none"
					{placeholder} {rows} {value}
					on:input={onInput}></textarea>