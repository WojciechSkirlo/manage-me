import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	role: {
		type: String,
		enum: ['admin', 'devops', 'developer'],
		default: 'developer',
	},
});

export default mongoose.model('User', userSchema);