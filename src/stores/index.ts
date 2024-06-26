import { writable } from 'svelte/store';
import axios from 'axios';
import type { User } from '../types';

export const user = writable<User | null>(null);
export const token = writable<string | null>(null);
export const refreshToken = writable<string | null>(null);
export const loggedIn = writable<boolean>(false);

export function login(_token: string, _refreshToken: string) {
	loggedIn.set(true);
	token.set(_token);
	refreshToken.set(_refreshToken);

	localStorage.setItem('token', _token);
	localStorage.setItem('refreshToken', _refreshToken);

	axios.defaults.headers.common['Authorization'] = _token ? `Bearer ${_token}` : undefined;
}

export function logout() {
	loggedIn.set(false);
	token.set(null);
	refreshToken.set(null);
	user.set(null);

	localStorage.removeItem('token');
	localStorage.removeItem('refreshToken');
}