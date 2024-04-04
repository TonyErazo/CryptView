import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

describe('Test Name', () => {
	let renderComponent = () => null;
	let store = null;

	beforeEach(() => {
		renderComponent = () => {
			
			store = configureStore()
			
			render(
				<Provider store={store}>
					<App></App>
				</Provider>
			)
		}
	})

	afterEach(() => {
		store = null;
	});

	it('renders learn react link', () => {
		render(<App />);
		const linkElement = screen.getByText(/learn react/i);
		expect(linkElement).toBeInTheDocument();
	});

});