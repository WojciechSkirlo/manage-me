import { writable } from 'svelte/store';

// Tworzymy writable store
export const count = writable(0);

// Możesz również stworzyć inne store'y
export const user = writable({
	name: '',
	loggedIn: false,
});