import { Request, Response } from 'express';
import Story from '../models/Story.model';

export default class StoryController {
	public static async list(req: Request, res: Response) {
		try {
			const stories = await Story.find().populate('project').populate('owned_by');

			res.status(200).json({ message: 'Fetched story list', result: stories });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async get(req: Request, res: Response) {
		try {
			const story = await Story.findOne({ _id: req.params.id });

			res.status(200).json({ message: 'Fetched story', result: story });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async add(req: Request, res: Response) {
		try {
			const { name, description, priority, project, status, owned_by } = req.body;

			if (!name) return res.status(422).json({ errors: { name: 'Name is required' } });
			if (!description) return res.status(422).json({ errors: { description: 'Description is required' } });
			if (!priority) return res.status(422).json({ errors: { priority: 'Priority is required' } });
			if (!project) return res.status(422).json({ errors: { project: 'Project is required' } });
			if (!status) return res.status(422).json({ errors: { status: 'Status is required' } });
			if (!owned_by) return res.status(422).json({ errors: { owned_by: 'Owner is required' } });

			const newStory = new Story({ name, description, priority, project, status, owned_by });

			await newStory.save();

			res.status(201).json({ message: 'Story created', result: newStory });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async edit(req: Request, res: Response) {
		try {
			const { name, description, priority, project, status, owned_by } = req.body;

			if (!name) return res.status(422).json({ errors: { name: 'Name is required' } });
			if (!description) return res.status(422).json({ errors: { description: 'Description is required' } });
			if (!priority) return res.status(422).json({ errors: { priority: 'Priority is required' } });
			if (!project) return res.status(422).json({ errors: { project: 'Project is required' } });
			if (!status) return res.status(422).json({ errors: { status: 'Status is required' } });
			if (!owned_by) return res.status(422).json({ errors: { owned_by: 'Owner is required' } });

			const story = await Story.findOneAndUpdate({ _id: req.params.id }, {
				name,
				description,
				priority,
				project,
				status,
				owned_by
			}, { new: true });

			if (!story) return res.status(404).json({ message: 'Story not found' });

			res.status(200).json({ message: 'Story updated', result: project });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async delete(req: Request, res: Response) {
		try {
			const story = await Story.findOneAndDelete({ _id: req.params.id });

			if (!story) return res.status(404).json({ message: 'Story not found' });

			res.status(200).json({ message: 'Story deleted', result: story });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}
}