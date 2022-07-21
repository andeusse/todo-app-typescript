export type GetTodoItem = {
	_id: string;
	userId: string;
	description: string;
	startDate: Date;
	endDate: Date | undefined;
	isFinished: boolean;
};

export type PostTodoItem = {
	description: string;
	startDate: Date;
};
