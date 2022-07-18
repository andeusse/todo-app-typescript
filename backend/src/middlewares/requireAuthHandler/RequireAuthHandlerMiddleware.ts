import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import {
	IUser,
	RequestWithUser,
	UserIDJwtPayload,
	UserModel,
} from '../../types/User';
import Config from '../../config/config';

const User = mongoose.model<IUser, UserModel>('User');

const secretKet = Config.getInstance().params.SecretKey;

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).send({ error: 'You must be log in' });
	}

	const token = authorization.replace('Bearer ', '');
	jwt.verify(token, secretKet, async (err, payload) => {
		if (err) {
			return res.status(401).send({ error: 'You must be log in' });
		}
		const { userId } = <UserIDJwtPayload>payload;

		const user = await User.findById(userId);
		if (user) {
			(<RequestWithUser>req).user = user;
		} else {
			return res.status(401).send({ error: 'User not found' });
		}
		next();
	});
};

export default requireAuth;
