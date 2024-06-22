<script>
	import { goto } from '$app/navigation';
	import UIInput from '$lib/UI/Input.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	function handleSignIn() {
		goto('/projects/1');
	}
</script>

<div class="flex min-h-dvh bg-white justify-center items-center">
	<div class="container flex justify-center">
		<div class="p-5 bg-white w-96 border border-fills-primary rounded-lg drop-shadow">
			<h1 class="text-3xl font-bold mb-4">Sign in</h1>
			<div class="flex gap-4 flex-col mb-6">
				<UIInput placeholder="E-mail" />
				<UIInput placeholder="Password" />
			</div>
			<UIButton variant="primary" text="Sign in" fill on:click={handleSignIn} />
		</div>
	</div>
</div>