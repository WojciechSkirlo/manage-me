import express from 'express';
import controller from '../controllers/Auth.controller';

const router = express.Router();

router.post('/sign-in', controller.signIn);
router.post('/sign-up', controller.signUp);
router.post('/refresh-token', controller.refreshToken);

export default router;