import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { GetTodoItem } from '../types/TodoItem';

type Props = {
	todoItem: GetTodoItem;
};

const TodoItem = (props: Props) => {
	const { todoItem } = props;
	return (
		<TableRow
			key={todoItem._id}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell>Actions</TableCell>
			<TableCell>{todoItem.description}</TableCell>
			<TableCell align="center">{todoItem.startDate.toString()}</TableCell>
			<TableCell align="center">{todoItem.endDate?.toString()}</TableCell>
			<TableCell align="center">{todoItem.isFinished.toString()}</TableCell>
		</TableRow>
	);
};

export default TodoItem;
