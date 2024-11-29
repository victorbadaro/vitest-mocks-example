import { useEffect, useState } from 'react';
import { api } from './services/api';

export type Todo = {
	id: number;
	title: string;
	completed: boolean;
};

export function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		api.get('/todos').then((response) => setTodos(response.data));
	}, []);

	return (
		<div className="min-h-screen bg-zinc-950 text-zinc-50">
			<h1>Todos</h1>

			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						{todo.id} - {todo.title} - <span>Completed?</span> -{' '}
						{todo.completed ? '✅ Done' : '⛔️ Not completed yet'}
					</li>
				))}
			</ul>
		</div>
	);
}
