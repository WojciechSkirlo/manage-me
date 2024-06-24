import { writable } from 'svelte/store';

export interface UserStore {
	loggedIn: boolean;
	user: User | null;
}

export interface User {
	_id: string;
	name: string;
	email: string;
	role: Role;
}

export type Role = 'admin' | 'devops' | 'developer'

export const user = writable<UserStore>({
	loggedIn: false,
	user: null,
});