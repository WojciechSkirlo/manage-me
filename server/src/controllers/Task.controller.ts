import { Request, Response } from 'express';
import Task from '../models/Task.model';

export default class StoryController {
	public static async list(req: Request, res: Response) {
		try {
			const tasks = await Task.find();

			res.status(200).json({ message: 'Fetched tasks list', result: tasks });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async get(req: Request, res: Response) {
		try {
			const task = await Task.findOne({ _id: req.params.id });

			res.status(200).json({ message: 'Fetched task', result: task });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async add(req: Request, res: Response) {
		try {
			const { name, description, priority, story, taskExecutionTime, status, assigned_to } = req.body;

			if (!name) return res.status(422).json({ errors: { name: 'Name is required' } });
			if (!description) return res.status(422).json({ errors: { description: 'Description is required' } });
			if (!priority) return res.status(422).json({ errors: { priority: 'Priority is required' } });
			if (!story) return res.status(422).json({ errors: { story: 'Story is required' } });
			if (!taskExecutionTime) return res.status(422).json({ errors: { taskExecutionTime: 'TaskExecutionTime is required' } });
			if (!status) return res.status(422).json({ errors: { status: 'Status is required' } });
			if (!assigned_to) return res.status(422).json({ errors: { assigned_to: 'Assigned to is required' } });

			const newStory = new Task({ name, description, priority, story, taskExecutionTime, status, assigned_to });

			await newStory.save();

			res.status(201).json({ message: 'Task created', result: newStory });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async edit(req: Request, res: Response) {
		try {
			// const { name, description, priority, project, status, owned_by } = req.body;
			//
			// if (!name) return res.status(422).json({ errors: { name: 'Name is required' } });
			// if (!description) return res.status(422).json({ errors: { description: 'Description is required' } });
			// if (!priority) return res.status(422).json({ errors: { priority: 'Priority is required' } });
			// if (!project) return res.status(422).json({ errors: { project: 'Project is required' } });
			// if (!status) return res.status(422).json({ errors: { status: 'Status is required' } });
			// if (!owned_by) return res.status(422).json({ errors: { owned_by: 'Owner is required' } });
			//
			// const story = await Story.findOneAndUpdate({ _id: req.params.id }, {
			// 	name,
			// 	description,
			// 	priority,
			// 	project,
			// 	status,
			// 	owned_by
			// }, { new: true });
			//
			// if (!story) return res.status(404).json({ message: 'Story not found' });
			//
			// res.status(200).json({ message: 'Project updated', result: project });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async delete(req: Request, res: Response) {
		try {
			const task = await Task.findOneAndDelete({ _id: req.params.id });

			if (!task) return res.status(404).json({ message: 'Task not found' });

			res.status(200).json({ message: 'Task deleted', result: task });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}
}