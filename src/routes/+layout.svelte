<script lang="ts">
	import { FlatToast, ToastContainer } from 'svelte-toasts';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import AuthService from '../services/AuthService';
	import { loggedIn, login } from '../stores';
	import { theme } from '../stores/theme';
	import '../app.css';
	import UILoader from '$lib/UI/Loader.svelte';

	let loaded = false;

	$: {
		if (loaded) {
			if (browser && !$loggedIn && $page.url.pathname !== '/sign-in') {
				goto('/sign-in');
			} else if (browser && $loggedIn && $page.url.pathname === '/sign-in') {
				goto('/');
			}
		}
	}

	async function fetchRefreshToken(_refreshToken: string) {
		const response = await AuthService.refreshToken(_refreshToken);
		const newToken = response.result.token;
		const newRefreshToken = response.result.refreshToken;

		login(newToken, newRefreshToken);
	}

	async function init() {
		axios.defaults.baseURL = import.meta.env.VITE_PUBLIC_API_URL;

		if (browser) {
			if (
				localStorage.theme === 'dark' ||
				(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
			) {
				document.documentElement.classList.add('dark');
				theme.set('dark');
			} else {
				document.documentElement.classList.remove('dark');
				theme.set('light');
			}

			const _refreshToken = localStorage.getItem('refreshToken');

			if (_refreshToken) {
				await fetchRefreshToken(_refreshToken);
			}

			await new Promise(resolve => setTimeout(resolve, 1000));
			loaded = true;
		}
	}

	init();
</script>

{#if loaded}
	<ToastContainer let:data={data}>
		<FlatToast {data} />
	</ToastContainer>
	<slot />
{:else}
	<div class="w-100 bg-white dark:bg-[#000000A1] h-dvh flex justify-center items-center">
		<UILoader />
	</div>
{/if}
