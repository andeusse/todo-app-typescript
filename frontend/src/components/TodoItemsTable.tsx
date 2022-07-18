import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import TodoItem from './TodoItem';

import { GetTodoItem } from '../types/TodoItem';

type Props = {
	todoItems: GetTodoItem[];
};

const TodoItemsTable = (props: Props) => {
	const { todoItems } = props;
	console.log(todoItems);
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Actions</TableCell>
						<TableCell>Description</TableCell>
						<TableCell align="center">Start Date</TableCell>
						<TableCell align="center">End Date</TableCell>
						<TableCell align="center">Is Finished?</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{todoItems.map((todoItem) => {
						return <TodoItem todoItem={todoItem}></TodoItem>;
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TodoItemsTable;
