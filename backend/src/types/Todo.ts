import { ObjectId } from 'mongoose';
import { RequestWithUser } from './User';

export interface ITodoItem {
	userId: ObjectId;
	description: string;
	startDate: Date;
	endDate: Date;
	isFinished: boolean;
}

export type RequestWithUserTodo = ITodoItem & RequestWithUser;
