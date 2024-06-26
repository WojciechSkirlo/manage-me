import dotenv from 'dotenv';
import User from '../models/User.model';
import { Response } from 'express';

dotenv.config();

export default class AuthController {
	public static async me(req: any, res: Response) {
		try {
			const user = await User.findOne({ _id: req.userId }).select({
				_id: 1,
				first_name: 1,
				last_name: 1,
				email: 1,
				role: 1
			});

			res.json({ message: 'User fetched', result: user });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

}