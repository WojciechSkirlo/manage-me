<script lang="ts">
	import { browser } from '$app/environment';
	import { loggedIn, token, user } from '../../stores';
	import { Moon, Sun } from 'svelte-hero-icons';
	import { goto } from '$app/navigation';
	import UserService from '../../services/UserService';
	import UIDropdown from '$lib/UI/Dropdown.svelte';
	import UIDropdownItem from '$lib/UI/DropdownItem.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	let theme: 'light' | 'dark' = 'light';

	$: icon = theme === 'light' ? Sun : Moon;
	$: userName = $user?.first_name + ' ' + $user?.last_name + ` (${$user?.role})`;

	function changeTheme() {
		theme = theme === 'light' ? 'dark' : 'light';

		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			theme = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			theme = 'light';
		}
	}

	function handleLogout() {
		goto('/sign-in');

		user.set(null);
		loggedIn.set(false);
		token.set(null);
	}

	async function fetchUser() {
		try {
			const response = await UserService.me();

			user.set(response.result);
		} catch (error: any) {
			console.log('error', error);
		}
	}

	fetchUser();
</script>

<header
	class="h-13 px-4 py-2 flex text-text-secondary dark:text-text-secondary-dark font-semibold items-center justify-between">
	<div>
		<span>UI Flip  /  Clients  /  What’s My SERP</span>
	</div>
	<div class="flex gap-2">
		<UIButton icon={icon} on:click={changeTheme} />
		<UIDropdown>
			<UIDropdownItem>{userName}</UIDropdownItem>
			<UIDropdownItem on:click={handleLogout}>Logout</UIDropdownItem>
		</UIDropdown>
	</div>
</header>