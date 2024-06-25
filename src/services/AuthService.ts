import axios from 'axios';

export default class AuthService {
	public static async signIn(form: FormModel) {
		return (await axios.post('/api/auth/sign-in', form)).data;
	}
}

export interface FormModel {
	email: string;
	password: string;
}