import { Button, Container, FormGroup, Stack, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/userState';

const LogoutView = () => {
	const [user, setUser] = useRecoilState(userState);
	const navigate = useNavigate();

	const onLogoutClickHandler = () => {
		localStorage.removeItem('user');
		setUser(undefined);
		navigate('/signin');
	};

	return (
		<FormGroup sx={{ marginTop: '25px' }}>
			<Container maxWidth="sm">
				<Stack spacing={5} direction="column">
					<TextField
						required
						id="outlined-required"
						label="Email"
						value={user?.email}
					/>
					<TextField
						required
						id="outlined-required"
						label="Name"
						value={user?.name}
					/>
					<Button variant="contained" onClick={onLogoutClickHandler}>
						Logout
					</Button>
				</Stack>
			</Container>
		</FormGroup>
	);
};

export default LogoutView;
