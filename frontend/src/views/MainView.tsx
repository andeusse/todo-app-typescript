import { Alert, AlertTitle, Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoItemsState } from '../atoms/todoState';
import { userState } from '../atoms/userState';
import AddTodoItem from '../components/AddTodoItem';
import TodoItemsTable from '../components/TodoItemsTable';
import { getTodoItems } from '../controllers/todo';
import { ErrorMessage } from '../types/Error';
import { GetTodoItem, PostTodoItem } from '../types/TodoItem';

export const MainView = () => {
	const user = useRecoilValue(userState);

	const [todos, setTodos] = useRecoilState<GetTodoItem[]>(todoItemsState);

	const [error, seterror] = useState('');

	useEffect(() => {
		if (user) {
			getTodoItems(user.token)
				.then((data) => {
					setTodos(data.data);
				})
				.catch((err) => {
					seterror((err.response?.data as ErrorMessage).message);
				});
		}
	}, [user, setTodos, seterror]);

	const addTodoHandler = (todoItem: PostTodoItem) => {};

	return (
		<React.Fragment>
			{error !== '' && (
				<Alert variant="outlined" severity="error">
					<AlertTitle>Error</AlertTitle>
					{error}
				</Alert>
			)}
			<Grid container spacing={2} sx={{ marginTop: '10px' }}>
				<Grid item xs={8}>
					<Container maxWidth="xl">
						<TodoItemsTable todoItems={todos}></TodoItemsTable>
					</Container>
				</Grid>
				<Grid item xs={4}>
					<Container maxWidth="xs">
						<AddTodoItem addTodo={addTodoHandler}></AddTodoItem>
					</Container>
				</Grid>
			</Grid>
		</React.Fragment>
	);
};
