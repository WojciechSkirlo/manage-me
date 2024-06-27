import axios from 'axios';
import type { Resource } from '../types';

export default class ProjectService {
	public static async get(id: string): Promise<Resource<any>> {
		return (await axios.get(`/api/project/${id}`)).data;
	}

	public static async list(): Promise<Resource<any>> {
		return (await axios.get('/api/project/list')).data;
	}

	public static async add(model: FormModel): Promise<Resource<any>> {
		return (await axios.post('/api/project/add', model)).data;
	}

	public static async edit(id: string, model: FormModel): Promise<Resource<any>> {
		return (await axios.put(`/api/project/edit/${id}`, model)).data;
	}

	public static async delete(id: string): Promise<Resource<any>> {
		return (await axios.delete(`/api/project/delete/${id}`)).data;
	}
}

export interface FormModel {
	name: string;
	description: string;
}