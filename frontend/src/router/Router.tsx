import { Tabs, Tab } from '@mui/material';
import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/userState';
import LogoutView from '../views/LogoutView';

import { MainView } from '../views/MainView';
import ModifyTodoView from '../views/ModifyTodoView';
import NotFoundView from '../views/NotFoundView';
import SigninView from '../views/SigninView';
import SignupView from '../views/SignupView';

const Router = () => {
	const [user, setUser] = useRecoilState(userState);

	const [value, setValue] = React.useState(0);

	useEffect(() => {
		const userLocalStorage = localStorage.getItem('user');
		if (userLocalStorage) {
			setUser(JSON.parse(userLocalStorage));
		}
	}, [setUser]);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<React.Fragment>
			<Tabs value={value} onChange={handleChange} aria-label="nav tabs">
				{user && <Tab component={Link} label="Home" to="/" />}
				{!user && (
					<Tab
						component={Link}
						label="Signin"
						to="/signin"
						sx={{
							position: 'absolute',
							right: '0px',
							textAlign: 'right',
						}}
					/>
				)}
				{user && (
					<Tab
						component={Link}
						label="Logout"
						to="/logout"
						sx={{ position: 'absolute', right: '0', textAlign: 'right' }}
					/>
				)}
			</Tabs>
			<Routes>
				{user && <Route path="/" element={<MainView />} />}
				{!user && <Route path="/signin" element={<SigninView />} />}
				{!user && <Route path="/signup" element={<SignupView />} />}
				{user && <Route path="/modifyTodo" element={<ModifyTodoView />} />}
				{user && <Route path="/logout" element={<LogoutView />} />}
				<Route path="/*" element={<NotFoundView />} />
			</Routes>
		</React.Fragment>
	);
};

export default Router;
