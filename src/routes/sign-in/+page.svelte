<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '../../stores';
	import UIGroup from '$lib/UI/Group.svelte';
	import UIInput from '$lib/UI/Input.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	let form = {
		email: '',
		password: ''
	};

	function handleSubmit(e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
		e.preventDefault();

		user.set({
			loggedIn: true,
			user: {
				_id: '1',
				role: 'admin',
				name: 'John Doe',
				email: 'john@doe.pl'
			}
		});

		console.log('User logged in', form);

		goto('/projects/1');
	}
</script>

<div class="flex min-h-dvh bg-white justify-center items-center">
	<div class="container flex justify-center">
		<div class="p-5 bg-white w-96 border border-fills-primary rounded-lg drop-shadow">
			<h1 class="text-3xl font-bold mb-4">Sign in</h1>
			<form on:submit={handleSubmit}>
				<UIGroup>
					<UIInput bind:value={form.email} placeholder="E-mail" />
				</UIGroup>
				<UIGroup>
					<UIInput bind:value={form.password} type="password" placeholder="Password" />
				</UIGroup>
				<UIButton type="submit" variant="primary" text="Sign in" fill />
			</form>
		</div>
	</div>
</div>