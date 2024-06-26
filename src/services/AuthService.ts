import axios from 'axios';
import type { Resource } from '../types';


export default class AuthService {
	public static async signIn(form: FormModel): Promise<Resource<string>>{
		return (await axios.post('/api/auth/sign-in', form)).data;
	}
}

export interface FormModel {
	email: string;
	password: string;
}