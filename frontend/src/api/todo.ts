import { todoApi } from './todoApi';
import { PostTodoItem, GetTodoItem } from '../types/TodoItem';

export const getTodoItems = (token: string) => {
	return todoApi.get('/todos', {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const addTodoItem = (data: PostTodoItem, token: string) => {
	return todoApi.post('/todos', data, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const deleteTodoItem = (id: string, token: string) => {
	return todoApi.delete(`/todos/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	});
};

export const updateTodoItem = (data: GetTodoItem, token: string) => {
	return todoApi.put(`/todos/${data._id}`, data, {
		headers: { Authorization: `Bearer ${token}` },
	});
};
