import axios from 'axios';
import type { Resource, User } from '../types';

export default class UserService {
	public static async me(): Promise<Resource<User>> {
		return (await axios.get('/api/user/me')).data;
	}

	public static async list(): Promise<Resource<any>> {
		return (await axios.get('/api/user/list')).data;
	}
}