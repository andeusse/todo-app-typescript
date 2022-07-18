import mongoose, { Error } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserMethods, UserModel } from '../types/User';

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		unique: false,
		required: true,
	},
	name: {
		type: String,
		unique: false,
		required: true,
	},
});

userSchema.pre(
	'save',
	function (next: mongoose.CallbackWithoutResultAndOptionalError) {
		const user = this;
		if (!user.isModified('password')) {
			return next();
		}
		bcrypt.genSalt(10, (err, salt) => {
			if (err) {
				return next(err);
			}
			bcrypt.hash(user.password, salt, (errB, hash) => {
				if (errB) {
					return next(errB);
				}
				user.password = hash;
				next();
			});
		});
	}
);

userSchema.methods.comparePassword = function (candidatePassword: string) {
	const user = this;
	return new Promise<Error | boolean>((resolve, reject) => {
		bcrypt.compare(
			candidatePassword,
			user.password,
			(err: Error | undefined, isMatch: boolean) => {
				if (err) {
					return reject(err);
				}
				if (!isMatch) {
					return reject(false);
				}
				return resolve(true);
			}
		);
	});
};

mongoose.model('User', userSchema);
