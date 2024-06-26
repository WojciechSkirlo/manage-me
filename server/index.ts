import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/database';
import AuthRouter from './src/routes/Auth.routes';
import UserRouter from './src/routes/User.routes';

dotenv.config();
connectDB();

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

router.use('/auth', AuthRouter);
router.use('/user', UserRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
// const HOST_NAME = process.env.HOST_NAME;

server.listen(PORT, () => {
	console.log(`Server listening on port http://localhost:${PORT}`);
});