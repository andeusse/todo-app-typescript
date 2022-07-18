import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Router from './router/Router';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const App = () => {
	return (
		<RecoilRoot>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					<Router></Router>
				</BrowserRouter>
			</ThemeProvider>
		</RecoilRoot>
	);
};

export default App;
