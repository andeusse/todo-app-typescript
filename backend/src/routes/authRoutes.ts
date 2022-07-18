import { Router } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from '../types/User';
import Config from '../config/Config';

const User = mongoose.model<IUser, UserModel>('User');

const router = Router();

const secretKet = Config.getInstance().params.SecretKey;

router.post('/signup', async (req, res) => {
	try {
		const { email, password, name } = req.body;
		if (!email || !password) {
			return res
				.status(422)
				.send({ message: 'Mush provide email and password' });
		}
		const user = new User({ email, password, name });

		await user.save();

		const token = jwt.sign({ userId: user._id, email, name }, secretKet);
		res.send({ token, email, name });
	} catch (error) {
		res.status(422).send({ message: 'Email already in use' });
	}
});

router.post('/signin', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).send({ message: 'Mush provide email and password' });
	}

	User.findOne({ email })
		.then((user) => {
			if (user) {
				user
					.comparePassword(password)
					.then(() => {
						const token = jwt.sign(
							{ userId: user._id, email: user.email, name: user.name },
							secretKet
						);
						res.send({ token, email: user.email, name: user.name });
					})
					.catch(() => {
						return res
							.status(422)
							.send({ message: 'Invalid email or password' });
					});
			} else {
				return res.status(422).send({ message: 'Invalid email or password' });
			}
		})
		.catch(() => {
			return res.status(422).send({ message: 'Invalid email or password' });
		});
});

export default router;
