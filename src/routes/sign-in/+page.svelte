<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '../../stores';
	import type { FormModel } from '../../services/AuthService';
	import AuthService from '../../services/AuthService';
	import UIGroup from '$lib/UI/Group.svelte';
	import UIInput from '$lib/UI/Input.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	let form: FormModel = {
		email: '',
		password: ''
	};

	async function handleSubmit(e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
		e.preventDefault();

		try {
			const response = await AuthService.signIn(form);

			user.set({
				loggedIn: true,
				user: {
					_id: '1',
					role: 'admin',
					first_name: 'John',
					last_name: 'Doe',
					email: 'john@doe.pl'
				}
			});

			console.log('response', response);
			console.log('User logged in', form);

			goto('/projects/1');
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="flex min-h-dvh bg-white justify-center items-center">
	<div class="container flex justify-center">
		<div class="p-5 bg-white w-96 border border-fills-primary rounded-lg drop-shadow">
			<h1 class="text-3xl font-bold mb-4">Sign in</h1>
			<form on:submit={handleSubmit}>
				<UIGroup label="E-mail">
					<UIInput bind:value={form.email} placeholder="" />
				</UIGroup>
				<UIGroup label="Password">
					<UIInput bind:value={form.password} type="password" placeholder="" />
				</UIGroup>
				<UIButton type="submit" variant="primary" text="Sign in" fill />
			</form>
		</div>
	</div>
</div>