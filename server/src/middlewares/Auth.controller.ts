import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Response } from 'express';

dotenv.config();

function verifyToken(req: any, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) return res.status(401).json({ error: 'Access denied' });

	try {
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
		req.userId = decoded.userId;
		next();
	} catch {
		res.status(401).json({ error: 'Invalid token' });
	}
}

export default verifyToken;