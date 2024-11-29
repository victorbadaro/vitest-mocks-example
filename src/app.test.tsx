import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './app';

describe('<App />', () => {
	it('should render the component without any errors', () => {
		render(<App />);

		expect(screen.getByRole('heading')).toHaveTextContent('Todos');
	});
});
