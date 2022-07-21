import {
	Alert,
	AlertTitle,
	Button,
	Container,
	FormGroup,
	Stack,
	TextField,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atoms/userState';
import { signin } from '../api/user';
import { ErrorMessage } from '../types/Error';
import { SigninUser } from '../types/User';

const SigninView = () => {
	const navigate = useNavigate();

	const setUser = useSetRecoilState(userState);

	const [userForm, setUserForm] = useState<SigninUser>({
		email: 'email@email.com',
		password: 'password',
	});

	const [error, seterror] = useState('');

	const propertyChangeHandler = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		propName: string
	) => {
		const value = e.currentTarget.value;
		setUserForm((oldUser) => {
			return {
				...oldUser,
				[propName]: value,
			};
		});
	};

	const onLoginClickHandler = () => {
		signin(userForm)
			.then((data) => {
				setUser(data.data);
				localStorage.setItem('user', JSON.stringify(data.data));
				navigate('/');
			})
			.catch((err) => {
				seterror((err.response?.data as ErrorMessage).message);
			});
	};

	return (
		<FormGroup sx={{ marginTop: '25px' }}>
			<Container maxWidth="sm">
				<Stack spacing={5} direction="column">
					{error !== '' && (
						<Alert variant="outlined" severity="error">
							<AlertTitle>Error</AlertTitle>
							{error}
						</Alert>
					)}
					<TextField
						required
						id="outlined-required"
						label="Email"
						value={userForm.email}
						onChange={(e) => propertyChangeHandler(e, 'email')}
					/>
					<TextField
						required
						id="outlined-password-input"
						label="Password"
						type="password"
						autoComplete="current-password"
						value={userForm.password}
						onChange={(e) => propertyChangeHandler(e, 'password')}
					/>
					<Button variant="contained" onClick={onLoginClickHandler}>
						Login
					</Button>
					<Button variant="text" onClick={() => navigate('/signup')}>
						Don't have an account?
					</Button>
				</Stack>
			</Container>
		</FormGroup>
	);
};

export default SigninView;
