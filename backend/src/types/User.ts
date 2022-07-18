import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mongoose, { Model } from 'mongoose';

export interface IUser {
	_id: mongoose.Schema.Types.ObjectId;
	email: string;
	name: string;
	password: string;
}

export interface IUserMethods {
	comparePassword(candidatePassword: string): Promise<Error | boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

export interface UserIDJwtPayload extends JwtPayload {
	userId: string;
}

export interface RequestWithUser extends Request {
	user: IUser;
}
