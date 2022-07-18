export type GetTodoItem = {
	_id: string;
	userId: string;
	description: string;
	startDate: Date;
	endDate: Date;
	isFinished: boolean;
};

export type PostTodoItem = {
	description: string;
	startDate: Date;
};

export type PutTodoItem = {
	description: string;
	startDate: Date;
	endDate: Date;
	isFinished: boolean;
};
