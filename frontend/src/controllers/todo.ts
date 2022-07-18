import { todoApi } from '../api/todoApi';
import { PostTodoItem, PutTodoItem } from '../types/TodoItem';

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

export const updateTodoItem = (
	id: string,
	data: PutTodoItem,
	token: string
) => {
	return todoApi.put(`/todos/${id}`, data, {
		headers: { Authorization: `Bearer ${token}` },
	});
};
