import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import { IUser, UserModel } from '../../models/User';

const User = mongoose.model<IUser, UserModel>('User');

interface UserIDJwtPayload extends jwt.JwtPayload {
	userId: string;
}

export interface RequestWithUser extends Request {
	user: IUser;
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).send({ error: 'You must be log in' });
	}

	const token = authorization.replace('Bearer ', '');
	jwt.verify(token, process.env.DEV_SECRET_KEY!, async (err, payload) => {
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
