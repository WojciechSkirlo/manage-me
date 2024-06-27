import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
	name: String,
	description: String,
	priority: {
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'medium'
	},
	story: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Story'
	},
	taskExecutionTime: String,
	status: {
		type: String,
		enum: ['todo', 'doing', 'done'],
		default: 'todo'
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	started_at: {
		type: Date,
		default: null
	},
	completed_at: {
		type: Date,
		default: null
	},
	assigned_to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

export default mongoose.model('Task', taskSchema);