import * as React from 'react'
import { container, useBlocMappedState } from 'rx-bloc'

import { TODO } from 'blocs'
import { TodoData, TodoFilter } from 'blocs/TodoBloc'

import Todo from './Todo'

function ToggleAll(): React.ReactElement {
	const todoBloc = container.get(TODO)

	const handleToggleAll = () => todoBloc.dispatch({ type: 'toggle_all' })

	const allComplete = useBlocMappedState(todoBloc, state => state.todos.find(todo => !todo.completed) === undefined)

	return (
		<>
			<input id='toggle-all'
				className='toggle-all'
				type='checkbox'
				checked={allComplete}
				onChange={handleToggleAll} />
			<label htmlFor='toggle-all'>Mark all as complete</label>
		</>
	)

}

function Todos(): React.ReactElement {
	const todoBloc = container.get(TODO)

	const filter = useBlocMappedState(todoBloc, state => state.filter)
	const todos = useBlocMappedState(todoBloc, state => state.todos)
	const editing = useBlocMappedState(todoBloc, state => state.editing)

	return (
		<ul className='todo-list'>{todos.map((todo: TodoData, index: number) => (
			<Todo key={index}
				todo={todo}
				index={index}
				editing={editing === index}
				hidden={filter === TodoFilter.ACTIVE && todo.completed || filter === TodoFilter.COMPLETED && !todo.completed} />
		))}</ul>
	)
}

function Main(): React.ReactElement {
	const todoBloc = container.get(TODO)

	const todosCountNonzero = useBlocMappedState(todoBloc, state => state.todos.length > 0)

	return (
		<section className='main' style={{ display: todosCountNonzero ? 'block' : 'none' }}>
			<ToggleAll />
			<Todos />
		</section>
	)
}

export default Main
