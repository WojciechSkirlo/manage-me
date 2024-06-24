<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { user } from '../stores';
	import '../app.css';

	$: if (browser && !$user.loggedIn && $page.url.pathname !== '/sign-in') {
		console.log(
			'we are running in the browser, not signed in, and not on the sign in page, we are going to the sign in page'
		);
		goto('/sign-in');
	} else if (browser && $user.loggedIn && $page.url.pathname === '/sign-in') {
		console.log(
			'we are running in the browser, signed in, and on the sign in page, we are going to the home page'
		);
		goto('/');
	}
</script>

<slot />