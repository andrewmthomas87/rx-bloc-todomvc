import * as React from 'react'
import { container, useBlocMappedState } from 'rx-bloc'

import { TODO } from 'blocs'
import { TodoFilter } from 'blocs/TodoBloc'

function TodoCount(): React.ReactElement {
	const todoBloc = container.get(TODO)

	const activeTodosCount = useBlocMappedState(todoBloc, state => state.todos.filter(todo => !todo.completed).length)

	return <span className='todo-count'><strong>{activeTodosCount}</strong> item{activeTodosCount !== 1 ? 's' : ''} left</span>
}

function Filters(): React.ReactElement {
	const todoBloc = container.get(TODO)

	const filter = useBlocMappedState(todoBloc, state => state.filter)

	return (
		<ul className='filters'>
			<li>
				<a className={filter === TodoFilter.ALL ? 'selected' : ''} href='#/'>All</a>
			</li>
			<li>
				<a className={filter === TodoFilter.ACTIVE ? 'selected' : ''} href='#/active'>Active</a>
			</li>
			<li>
				<a className={filter === TodoFilter.COMPLETED ? 'selected' : ''} href='#/completed'>Completed</a>
			</li>
		</ul>
	)
}

function ClearComplete(): React.ReactElement {
	const todoBloc = container.get(TODO)

	const handleClearCompleted = () => todoBloc.dispatch({ type: 'clear_completed' })

	const completeTodosCountNonzero = useBlocMappedState(todoBloc, state => state.todos.find(todo => todo.completed) !== undefined)

	return (
		<button className='clear-completed'
			style={{ display: completeTodosCountNonzero ? 'inline-block' : 'none' }}
			onClick={handleClearCompleted}>Clear completed</button>
	)
}

function Footer(): React.ReactElement {
	const todoBloc = container.get(TODO)

	const todosCountNonzero = useBlocMappedState(todoBloc, state => state.todos.length > 0)

	return (
		<footer className='footer' style={{ display: todosCountNonzero ? 'block' : 'none' }}>
			<TodoCount />
			<Filters />
			<ClearComplete />
		</footer>
	)
}

export default Footer
