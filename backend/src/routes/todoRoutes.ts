import { Request, Response, Router } from 'express';
import mongoose, { Error } from 'mongoose';

import requireAuth from '../middlewares/requireAuthHandler/RequireAuthHandlerMiddleware';
import { ITodoItem, RequestWithUserTodo } from '../types/Todo';
import { RequestWithUser } from '../types/User';

const TodoItem = mongoose.model<ITodoItem>('TodoItem');

const router = Router();

router.use(requireAuth);

router.get('/todos', async (req: Request, res: Response) => {
	const user = (<RequestWithUser>req).user;
	const todos = await TodoItem.find({ userId: user._id });
	return res.status(200).send(todos);
});

router.post('/todos', async (req: Request, res: Response) => {
	const user = (<RequestWithUserTodo>req).user;
	const { description, startDate } = (<RequestWithUserTodo>req).body;

	if (!description || !startDate) {
		return res.send({ message: 'Description and start date are mandatory' });
	}

	const todo = new TodoItem({
		userId: user._id,
		description,
		startDate: new Date(startDate),
	});

	todo
		.save()
		.then(() => {
			return res.status(200).send(todo);
		})
		.catch((err: Error) => {
			return res.status(500).send({ message: err.message });
		});
});

router.put('/todos/:id', async (req: Request, res: Response) => {
	const { id } = req.params;
	const update = req.body;

	if (id) {
		TodoItem.findByIdAndUpdate(id, update)
			.then(() => {
				return res.status(200).send({ message: 'Item updated' });
			})
			.catch(() => {
				return res.status(404).send({ message: 'Item not updated, try again' });
			});
	} else {
		return res.status(404).send({ message: 'Must include an id' });
	}
});

router.delete('/todos/:id', async (req: Request, res: Response) => {
	const { id } = req.params;

	if (id) {
		TodoItem.findByIdAndRemove(id)
			.then(() => {
				return res.status(200).send({ message: 'Item deleted' });
			})
			.catch(() => {
				return res.status(404).send({ message: 'Item not removed, try again' });
			});
	} else {
		return res.status(404).send({ message: 'Must include an id' });
	}
});

export default router;
