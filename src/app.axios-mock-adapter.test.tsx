import { render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { App, type Todo } from './app';
import { api } from './services/api';

describe('<App />', () => {
	let mockedAxiosClient: MockAdapter;

	beforeEach(() => {
		mockedAxiosClient = new MockAdapter(api);
	});

	afterEach(() => {
		mockedAxiosClient.reset();
	});

	it('should render the component without any errors', async () => {
		const mockedTodos: Todo[] = [
			{ id: 1, title: 'Todo 1', completed: false },
			{ id: 2, title: 'Todo 2', completed: true },
			{ id: 3, title: 'Todo 3', completed: true },
			{ id: 4, title: 'Todo 4', completed: false }
		];

		mockedAxiosClient.onGet('/todos').reply(200, mockedTodos);

		await act(async () => render(<App />));

		expect(screen.getByRole('heading')).toHaveTextContent('Todos');
		expect(screen.getAllByRole('listitem').length).toBe(mockedTodos.length);
	});
});
