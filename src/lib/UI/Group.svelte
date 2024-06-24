<script lang="ts">
	export let nospace = false;

</script>

<div class={`flex ${nospace ? 'mb-0' : 'mb-4'}`}>
	<slot />
</div>