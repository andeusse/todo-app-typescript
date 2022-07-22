import {
	Alert,
	AlertTitle,
	Button,
	Container,
	FormGroup,
	Stack,
	TextField,
} from '@mui/material';
import { AxiosError } from 'axios';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../atoms/userState';
import { signup } from '../api/user';
import { ErrorMessage } from '../types/Error';
import { SignupUser } from '../types/User';

const SignupView = () => {
	const navigate = useNavigate();

	const setUser = useSetRecoilState(userState);

	const [userForm, setUserForm] = useState<SignupUser>({
		email: 'email@email.com',
		password: 'password',
		name: 'Some Random Name',
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

	const onRegisterClickHandler = () => {
		signup(userForm)
			.then((data) => {
				seterror('');
				setUser(data.data);
				localStorage.setItem('user', JSON.stringify(data.data));
				navigate('/');
			})
			.catch((err: AxiosError) => {
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
					<TextField
						required
						id="outlined-required"
						label="Name"
						value={userForm.name}
						onChange={(e) => propertyChangeHandler(e, 'name')}
					/>
					<Button variant="contained" onClick={onRegisterClickHandler}>
						Register
					</Button>
					<Button variant="text" onClick={() => navigate('/signin')}>
						Already have an account?
					</Button>
				</Stack>
			</Container>
		</FormGroup>
	);
};

export default SignupView;
