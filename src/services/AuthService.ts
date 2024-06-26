import axios from 'axios';
import type { Resource } from '../types';

interface SignInResponse {
	token: string;
	refreshToken: string;
}

export default class AuthService {
	public static async signIn(form: FormModel): Promise<Resource<SignInResponse>> {
		return (await axios.post('/api/auth/sign-in', form)).data;
	}

	public static async refreshToken(refreshToken: string): Promise<Resource<SignInResponse>> {
		return (await axios.post('/api/auth/refresh-token', { refreshToken })).data;
	}
}

export interface FormModel {
	email: string;
	password: string;
}