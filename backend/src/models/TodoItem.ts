import mongoose from 'mongoose';
import { ITodoItem } from '../types/Todo';

const todoItemSchema = new mongoose.Schema<ITodoItem>({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		unique: false,
	},
	description: {
		type: mongoose.Schema.Types.String,
		required: true,
		unique: false,
	},
	startDate: {
		type: mongoose.Schema.Types.Date,
		required: true,
		unique: false,
	},
	endDate: {
		type: mongoose.Schema.Types.Date,
		required: false,
		unique: false,
	},
	isFinished: {
		type: mongoose.Schema.Types.Boolean,
		default: false,
		required: false,
		unique: false,
	},
});

mongoose.model('TodoItem', todoItemSchema);
