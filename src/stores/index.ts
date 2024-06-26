import { writable } from 'svelte/store';
import type { User } from '../types';

// export interface UserStore {
// 	loggedIn: boolean;
// 	// token: string | null;
// 	user: User | null;
// }

// export const user = writable<UserStore>({
// 	loggedIn: false,
// 	// token: null,
// 	user: null
// });

export const user = writable<User | null>(null);
export const token = writable<string | null>(null);
export const loggedIn = writable<boolean>(false);