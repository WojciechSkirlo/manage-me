import User from '../models/User.model';
import { Request, Response } from 'express';

export default class AuthController {
	public static async list(req: Request, res: Response) {
		try {
			const projects = await User.find().select({
				_id: 1,
				first_name: 1,
				last_name: 1,
				email: 1,
				role: 1
			});

			res.status(200).json({ message: 'Fetched user list', result: projects });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

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