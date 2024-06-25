import { writable } from 'svelte/store';
import type { User } from '../types';

export interface UserStore {
	loggedIn: boolean;
	user: User | null;
}

export const user = writable<UserStore>({
	loggedIn: false,
	user: null
});