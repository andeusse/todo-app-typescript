import { Alert, AlertTitle, Grid } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todoItemsState, todoItemState } from '../atoms/todoState';
import { userState } from '../atoms/userState';
import AddTodoItem from '../components/AddTodoItem';
import TodoItemsTable from '../components/TodoItemsTable';
import {
	addTodoItem,
	deleteTodoItem,
	getTodoItems,
	updateTodoItem,
} from '../api/todo';
import { ErrorMessage } from '../types/Error';
import { GetTodoItem, PostTodoItem } from '../types/TodoItem';
import UpdateTodoItemModal from '../components/UpdateTodoItemModal';

export const MainView = () => {
	const user = useRecoilValue(userState);

	const [todos, setTodos] = useRecoilState<GetTodoItem[]>(todoItemsState);

	const todoItem = useRecoilValue<GetTodoItem | undefined>(todoItemState);

	const [open, setOpen] = useState(false);

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

	const addTodoHandler = (todoItem: PostTodoItem) => {
		if (user) {
			addTodoItem(todoItem, user.token)
				.then((data) => {
					setTodos((oldTodos) => {
						return [...oldTodos, data.data];
					});
				})
				.catch((err) => {
					seterror((err.response?.data as ErrorMessage).message);
				});
		}
	};

	const deleteItem = (id: string) => {
		if (user) {
			deleteTodoItem(id, user.token)
				.then(() => {
					setTodos((oldTodos) => {
						return oldTodos.filter((todo) => todo._id !== id);
					});
				})
				.catch((err) => {
					seterror((err.response?.data as ErrorMessage).message);
				});
		}
	};

	const updateItem = (todoItem: GetTodoItem) => {
		if (user) {
			updateTodoItem(todoItem, user?.token)
				.then(() => {
					setTodos((oldTodos) => {
						const newTodos = oldTodos.map((todo) => {
							if (todo._id === todoItem._id) {
								return todoItem;
							}
							return todo;
						});
						return newTodos;
					});
					setOpen(false);
				})
				.catch((err) => {
					seterror((err.response?.data as ErrorMessage).message);
				});
		}
	};

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
						<TodoItemsTable
							todoItems={todos}
							deleteItem={deleteItem}
							updateItem={updateItem}
							setOpen={setOpen}
						></TodoItemsTable>
					</Container>
				</Grid>
				<Grid item xs={4}>
					<Container maxWidth="xs">
						<AddTodoItem addTodo={addTodoHandler}></AddTodoItem>
					</Container>
				</Grid>
			</Grid>
			<UpdateTodoItemModal
				open={open}
				todoItem={todoItem}
				updateItem={updateItem}
				setOpen={setOpen}
			></UpdateTodoItemModal>
		</React.Fragment>
	);
};
