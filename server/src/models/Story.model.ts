import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
	name: String,
	description: String,
	priority: {
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'medium'
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Project'
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	status: {
		type: String,
		enum: ['todo', 'doing', 'done'],
		default: 'todo'
	},
	owned_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
});

export default mongoose.model('Story', storySchema);