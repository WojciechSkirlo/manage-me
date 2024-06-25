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