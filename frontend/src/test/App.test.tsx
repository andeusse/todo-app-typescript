import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('Renders something with Signin', () => {
	render(<App />);
	const element = screen.getByText(/Signin/i);
	expect(element).toBeInTheDocument();
});
