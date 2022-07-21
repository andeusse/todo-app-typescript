import {
	TableCell,
	TableRow,
	Checkbox,
	Stack,
	IconButton,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useSetRecoilState } from 'recoil';
import moment from 'moment';

import { GetTodoItem } from '../types/TodoItem';
import { todoItemSelectedState } from '../atoms/todoState';

type Props = {
	todoItem: GetTodoItem;
	deleteItem: (id: string) => void;
	updateItem: (id: GetTodoItem) => void;
	setOpen: (open: boolean) => void;
};

const TodoItem = (props: Props) => {
	const { todoItem, deleteItem, updateItem, setOpen } = props;

	const settodoItemSelected = useSetRecoilState<string | undefined>(
		todoItemSelectedState
	);

	const onCheckedChangeHandler = () => {
		let endDate: Date | undefined = undefined;
		if (!todoItem.isFinished) {
			endDate = new Date();
		}
		const modTodoItem: GetTodoItem = {
			...todoItem,
			isFinished: !todoItem.isFinished,
			endDate: endDate,
		};
		updateItem(modTodoItem);
	};

	return (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell>
				<Stack spacing={1} direction="row">
					<IconButton
						aria-label="delete"
						onClick={() => {
							settodoItemSelected(todoItem._id);
							setOpen(true);
						}}
					>
						<Edit />
					</IconButton>
					<IconButton
						aria-label="delete"
						onClick={() => deleteItem(todoItem._id)}
					>
						<Delete sx={{ color: 'red' }} />
					</IconButton>
				</Stack>
			</TableCell>
			<TableCell>{todoItem.description}</TableCell>
			<TableCell align="center">
				{moment(todoItem.startDate).toDate().toLocaleString()}
			</TableCell>
			<TableCell align="center">
				{todoItem.isFinished
					? moment(todoItem.endDate).toDate().toLocaleString()
					: ''}
			</TableCell>
			<TableCell align="center">
				<Checkbox
					size="medium"
					checked={todoItem.isFinished}
					onClick={onCheckedChangeHandler}
				></Checkbox>
			</TableCell>
		</TableRow>
	);
};

export default TodoItem;
