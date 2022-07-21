import { Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { PostTodoItem } from '../types/TodoItem';

type Props = {
	addTodo: (postItem: PostTodoItem) => void;
};

const AddTodoItem = (props: Props) => {
	const { addTodo } = props;

	const [todo, setTodo] = useState<PostTodoItem>({
		description: '',
		startDate: new Date(),
	});

	const propertyChangeHandler = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		propName: string
	) => {
		const value = e.currentTarget.value;
		setTodo((oldUser) => {
			return {
				...oldUser,
				[propName]: value,
			};
		});
	};

	const handleDateChange = (newValue: Date | null) => {
		if (newValue) {
			setTodo((oldTodo) => {
				return {
					...oldTodo,
					startDate: newValue,
				};
			});
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Stack spacing={5} direction="column">
				<TextField
					required
					id="outlined-multiline-flexible"
					label="Description"
					multiline
					rows={5}
					value={todo.description}
					onChange={(e) => propertyChangeHandler(e, 'description')}
				/>
				<DateTimePicker
					label="Start Date"
					value={todo.startDate}
					onChange={handleDateChange}
					renderInput={(params) => <TextField {...params} />}
				/>
				<Button
					variant="contained"
					startIcon={<AddCircleIcon />}
					disabled={todo.description === ''}
					onClick={() => {
						addTodo(todo);
						setTodo({
							description: '',
							startDate: new Date(),
						});
					}}
				>
					Add
				</Button>
			</Stack>
		</LocalizationProvider>
	);
};

export default AddTodoItem;
