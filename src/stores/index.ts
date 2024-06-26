import { writable } from 'svelte/store';
import type { User } from '../types';

export const user = writable<User | null>(null);
export const token = writable<string | null>(null);
export const loggedIn = writable<boolean>(false);