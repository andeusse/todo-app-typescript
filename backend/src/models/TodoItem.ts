import mongoose, { ObjectId } from 'mongoose';
import { RequestWithUser } from '../middlewares/requireAuthHandler/RequireAuthHandlerMiddleware';

export interface ITodoItem {
	userId: ObjectId;
	description: string;
	startDate: Date;
	endDate: Date;
	isFinished: boolean;
}

export type RequestWithUserTodo = ITodoItem & RequestWithUser;

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
