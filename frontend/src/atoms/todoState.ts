import { atom, selector } from 'recoil';
import { GetTodoItem } from '../types/TodoItem';

export const todoItemsState = atom<GetTodoItem[]>({
	key: 'todoItemsState',
	default: [],
});

export const todoItemSelectedState = atom<string | undefined>({
	key: 'todoItemSelectedState',
	default: undefined,
});

export const todoItemState = selector({
	key: 'todoItemState',
	get: ({ get }) => {
		const todoItems = get(todoItemsState);
		const todoItemId = get(todoItemSelectedState);
		return todoItems.find((t) => t._id === todoItemId);
	},
});
