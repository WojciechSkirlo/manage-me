import axios from 'axios';
import type { Priority, Resource, Status } from '../types';

export default class TaskService {
	public static async get(id: string): Promise<Resource<any>> {
		return (await axios.get(`/api/task/${id}`)).data;
	}

	public static async list(): Promise<Resource<any>> {
		return (await axios.get('/api/task/list')).data;
	}

	public static async getTasksByProject(id: string): Promise<Resource<any>> {
		return (await axios.get(`/api/task/project/${id}`)).data;
	}

	public static async add(model: FormModel): Promise<Resource<any>> {
		return (await axios.post('/api/task/add', model)).data;
	}

	public static async edit(id: string, model: FormModel): Promise<Resource<any>> {
		return (await axios.put(`/api/task/edit/${id}`, model)).data;
	}

	public static async delete(id: string): Promise<Resource<any>> {
		return (await axios.delete(`/api/task/delete/${id}`)).data;
	}
}

export interface FormModel {
	name: string;
	description: string;
	priority: Priority;
	story: string;
	taskExecutionTime: string;
	status: Status;
	assigned_to: string;
}