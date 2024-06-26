import express from 'express';
import controller from '../controllers/User.controller';
import verifyToken from '../middlewares/Auth.controller';

const router = express.Router();

router.get('/me', verifyToken, controller.me);

export default router;