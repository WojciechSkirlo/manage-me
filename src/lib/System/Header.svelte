<script lang="ts">
	import { logout, user } from '../../stores';
	import { theme } from '../../stores/theme';
	import { Moon, Sun } from 'svelte-hero-icons';
	import { goto } from '$app/navigation';
	import UserService from '../../services/UserService';
	import UIDropdown from '$lib/UI/Dropdown.svelte';
	import UIDropdownItem from '$lib/UI/DropdownItem.svelte';
	import UIButton from '$lib/UI/Button.svelte';

	$: icon = $theme === 'light' ? Sun : Moon;
	$: userName = $user?.first_name + ' ' + $user?.last_name + ` (${$user?.role})`;

	function changeTheme() {
		theme.set($theme === 'light' ? 'dark' : 'light');

		if ($theme === 'dark') {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}

	function handleLogout() {
		logout();
		goto('/sign-in');
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
	class="h-13 px-4 py-2 flex text-text-secondary dark:text-text-primary-dark font-semibold items-center justify-between">
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