import dotenv from 'dotenv';
import { Request, Response } from 'express';
import Project from '../models/Project.model';

dotenv.config();

export default class ProjectController {
	public static async list(req: Request, res: Response) {
		try {
			const projects = await Project.find();

			res.status(200).json({ message: 'Fetched projects list', result: projects });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async get(req: Request, res: Response) {
		try {
			const projects = await Project.findOne({ _id: req.params.id });

			res.status(200).json({ message: 'Fetched project', result: projects });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async add(req: Request, res: Response) {
		try {
			const { name, description } = req.body;

			if (!name) return res.status(422).json({ errors: { name: 'Name is required' } });
			if (!description) return res.status(422).json({ errors: { description: 'Description is required' } });

			const existingProject = await Project.findOne({ name });

			if (existingProject) return res.status(422).json({ errors: { name: 'Project already exists' } });

			const newProject = new Project({ name, description });

			await newProject.save();

			res.status(201).json({ message: 'Project created', result: newProject });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async edit(req: Request, res: Response) {
		try {
			const { name, description } = req.body;
			if (!name) return res.status(422).json({ errors: { name: 'Name is required' } });
			if (!description) return res.status(422).json({ errors: { description: 'Description is required' } });

			const existingProject = await Project.findOne({ name, _id: { $ne: req.params.id } });
			const project = await Project.findOne({ _id: req.params.id });

			if (!project) return res.status(404).json({ message: 'Project not found' });
			if (existingProject && existingProject._id != project._id) return res.status(422).json({ errors: { name: 'Project already exists' } });

			project.name = name;
			project.description = description;
			await project.save();

			res.status(200).json({ message: 'Project updated', result: project });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}

	public static async delete(req: Request, res: Response) {
		try {
			const project = await Project.findOneAndDelete({ _id: req.params.id });

			if (!project) return res.status(404).json({ message: 'Project not found' });

			res.status(200).json({ message: 'Project deleted', result: project });
		} catch {
			res.status(500).json({ message: 'Internal server error' });
		}
	}
}