import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

describe('Test Name', () => {
	let renderComponent = () => null;
	let store = null;

	const reset = () => {
		renderComponent = () => {
				
			store = configureStore()
			
			return render(
				<Provider store={store}>
					<App></App>
				</Provider>
			)
		}
	}

	beforeEach(() => {
		reset();
	})

	afterEach(() => {
		store = null;
	});

});