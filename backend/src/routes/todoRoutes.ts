import { Request, Response, Router } from 'express';
import mongoose, { Error } from 'mongoose';

import requireAuth, {
	RequestWithUser,
} from '../middlewares/requireAuthHandler/RequireAuthHandlerMiddleware';
import { ITodoItem, RequestWithUserTodo } from '../models/TodoItem';

const TodoItem = mongoose.model<ITodoItem>('TodoItem');

const router = Router();

router.use(requireAuth);

router.get('/todo', async (req: Request, res: Response) => {
	const user = (<RequestWithUser>req).user;
	const todos = await TodoItem.find({ userId: user._id });
	res.status(200).send({ todos });
});

router.post('/todo', async (req: Request, res: Response) => {
	const user = (<RequestWithUserTodo>req).user;
	const { description, startDate } = (<RequestWithUserTodo>req).body;

	if (!description || !startDate) {
		res.send({ message: 'Description and start date are mandatory' });
	}

	const todo = new TodoItem({
		userId: user._id,
		description,
		startDate: new Date(startDate),
	});

	todo
		.save()
		.then(() => {
			res.send({ todo });
		})
		.catch((err: Error) => {
			res.status(500).send({ message: err.message });
		});
});

export default router;
