import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRouter from './routes/Auth.routes';

// import UserRouter from './src/routes/User.routes';
// const http = require('http');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();


// const authRouter = require('./src/routes/Auth.routes');
// const userRouter = require('./src/routes/User.routes');

dotenv.config();

// const connectDB = require('./src/config/database');
// connectDB();

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router);

router.get('/', (req, res) => {
	res.send('Hello World');
});
router.use('/auth', AuthRouter);
// router.use('/user', userRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
// const HOST_NAME = process.env.HOST_NAME;

server.listen(PORT, () => {
	console.log(`Server listening on port http://localhost:${PORT}`);
});