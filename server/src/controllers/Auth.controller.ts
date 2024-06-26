import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.model';
import { Request, Response } from 'express';

dotenv.config();

export default class AuthController {
	public static async signIn(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			const user = await User.findOne({ email });
			if (!user) return res.status(401).json({ errors: { password: 'Invalid email or password' } });

			const isPasswordValid = await bcrypt.compare(password, user.password ?? '');
			if (!isPasswordValid) return res.status(401).json({ errors: { password: 'Invalid email or password' } });

			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
				expiresIn: '1h'
			});

			const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
				expiresIn: '7d'
			});

			res.status(200).json({ message: 'User signed in', result: { token, refreshToken }});
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async signUp(req: Request, res: Response) {
		try {
			const { first_name, last_name, email, password, confirm_password } = req.body;

			if (password !== confirm_password) {
				return res.status(400).json({ errors: { confirm_password: 'Passwords do not match' } });
			}

			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(400).json({ errors: { email: 'User already exists' } });
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = new User({
				first_name,
				last_name,
				email,
				password: hashedPassword,
				role: 'admin',
			});

			await newUser.save();

			res.status(201).json({ message: 'User created' });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}
}