import axios from 'axios';
import type { Resource, Priority, Status, Project, User } from '../types';

export default class StoryService {
	public static async get(id: string): Promise<Resource<any>> {
		return (await axios.get(`/api/story/${id}`)).data;
	}

	public static async list(): Promise<Resource<any>> {
		return (await axios.get('/api/story/list')).data;
	}

	public static async add(model: FormModel): Promise<Resource<any>> {
		return (await axios.post('/api/story/add', model)).data;
	}

	public static async edit(id: string, model: FormModel): Promise<Resource<any>> {
		return (await axios.put(`/api/story/edit/${id}`, model)).data;
	}

	public static async delete(id: string): Promise<Resource<any>> {
		return (await axios.delete(`/api/story/delete/${id}`)).data;
	}
}

export interface FormModel {
	name: string;
	description: string;
	priority: Priority;
	project: Project | null;
	status: Status;
	owned_by: User | null;
}