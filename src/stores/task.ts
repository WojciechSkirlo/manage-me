import { writable } from 'svelte/store';
import type { Task } from '../types';
import TaskService from '../services/TaskService';

export const isTaskModal = writable(false);
export const tasks = writable<Task[]>([]);
export const editedTaskId = writable<string | null>(null);

export function toggleTaskModal(id?: string) {
	isTaskModal.update((value) => !value);

	if (id) {
		editedTaskId.set(id);
	}
}

export async function fetchProjectTasks(id: string) {
	try {
		const response = await TaskService.getTasksByProject(id);

		tasks.set(response.result);
	} catch (error: any) {
		console.log('error', error);
	}
}

