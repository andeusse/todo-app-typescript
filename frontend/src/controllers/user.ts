import { todoApi } from '../api/todoApi';
import { SigninUser, SignupUser } from '../types/User';

export const signin = (signinUser: SigninUser) => {
	const { email, password } = signinUser;
	return todoApi.post('/signin', { email, password });
};

export const signup = (signupUser: SignupUser) => {
	const { email, password, name } = signupUser;
	return todoApi.post('/signup', { email, password, name });
};
