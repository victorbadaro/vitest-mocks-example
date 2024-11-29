import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { type Mocked, describe, expect, it, vi } from 'vitest';
import { App, type Todo } from './app';
import { api } from './services/api';

vi.mock('./services/api');

describe('<App />', () => {
	const mockedAxiosClient = api as Mocked<typeof api>;

	it('should render the component without any errors', async () => {
		const mockedTodos: Todo[] = [
			{ id: 1, title: 'Todo 1', completed: false },
			{ id: 2, title: 'Todo 2', completed: true },
			{ id: 3, title: 'Todo 3', completed: true },
			{ id: 4, title: 'Todo 4', completed: false }
		];

		mockedAxiosClient.get.mockReturnValue(
			Promise.resolve({
				data: mockedTodos
			})
		);

		await act(async () => render(<App />));

		expect(screen.getByRole('heading')).toHaveTextContent('Todos');
		expect(screen.getAllByRole('listitem').length).toBe(mockedTodos.length);
	});
});
