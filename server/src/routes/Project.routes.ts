import express from 'express';
import controller from '../controllers/Project.controller';
import verifyToken from '../middlewares/Auth.controller';

const router = express.Router();

router.get('/list', verifyToken, controller.list);
router.get('/:id', verifyToken, controller.get);
router.post('/add', verifyToken, controller.add);
router.put('/edit/:id', verifyToken, controller.edit);
router.delete('/delete/:id', verifyToken, controller.delete);

export default router;