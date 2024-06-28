<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '../../stores';
	import type { FormModel } from '../../services/AuthService';
	import AuthService from '../../services/AuthService';
	import UIGroup from '$lib/UI/Group.svelte';
	import UIInput from '$lib/UI/Input.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	let form: FormModel = {
		email: '',
		password: ''
	};

	let errors: Record<string, string> = {};

	async function handleSubmit(e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) {
		e.preventDefault();

		try {
			const response = await AuthService.signIn(form);
			const _token = response.result.token;
			const _refreshToken = response.result.refreshToken;

			login(_token, _refreshToken);

			goto('/');
		} catch (error: any) {
			const status = error?.response?.status;

			if (status == 401) {
				errors = error?.response?.data?.errors ?? {};
			}
		}
	}
</script>

<div class="flex min-h-dvh bg-white justify-center dark:bg-[#28282880] items-center">
	<div class="container flex justify-center">
		<div class="p-5 bg-white dark:bg-fills-secondary-dark w-96 border border-fills-primary rounded-lg drop-shadow">
			<h1 class="text-3xl font-bold mb-4">Sign in</h1>
			<form on:submit={handleSubmit}>
				<UIGroup label="E-mail" error={errors['email']}>
					<UIInput bind:value={form.email} type="email" autocomplete="on" />
				</UIGroup>
				<UIGroup label="Password" error={errors['password']}>
					<UIInput bind:value={form.password} type="password" autocomplete="current-password" />
				</UIGroup>
				<UIButton type="submit" variant="primary" text="Sign in" fill />
			</form>
		</div>
	</div>
</div>