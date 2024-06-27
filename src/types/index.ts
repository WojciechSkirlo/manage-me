export interface Statement {
	message: string;
}

export interface Resource<T> extends Statement {
	result: T;
}

export interface User {
	_id: string;
	first_name: string;
	last_name: string;
	email: string;
	role: Role;
}

export type Role = 'admin' | 'devops' | 'developer'

export interface Project {
	_id: string;
	name: string;
	description: string;
}

export interface Story {
	_id: string;
	name: string;
	description: string;
	priority: Priority,
	project: Project;
	created_at: Date;
	status: Status;
	owned_by: User;
}

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'doing' | 'done';

export interface Task {
	_id: string;
	name: string;
	description: string;
	priority: Priority;
	story: Story;
	taskExecutionTime: string;
	status: Status;
	created_at: Date;
	started_at: Date;
	completed_at: Date;
	assigned_to: User;
}