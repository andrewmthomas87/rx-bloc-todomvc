import * as React from 'react'
import { useRef } from 'react'
import { container } from 'rx-bloc'

import { TODO } from 'blocs'
import { TodoData } from 'blocs/TodoBloc'

const ENTER_KEY = 13
const ESCAPE_KEY = 27

interface Props {
	todo: TodoData
	index: number
	editing: boolean
	hidden: boolean
}

function Todo({ todo, index, editing, hidden }: Props): React.ReactElement {
	const todoBloc = container.get(TODO)

	const editInput = useRef<HTMLInputElement>(null)

	const handleToggleCompleted = () => todoBloc.dispatch({
		type: 'toggle_completed',
		index
	})
	function handleEdit() {
		if (editInput.current !== null) {
			editInput.current.value = todo.text

			todoBloc.dispatch({
				type: 'edit',
				index
			})

			setTimeout(function () {
				if (editInput.current !== null) {
					editInput.current.focus()
				}
			}, 0)
		}
	}
	function handleSubmitEdit() {
		if (editInput.current !== null) {
			todoBloc.dispatch({
				type: 'submit_edit',
				text: editInput.current.value
			})
		}
	}
	function handleEditKeyDown(event: React.KeyboardEvent) {
		if (editInput.current !== null) {
			if (event.keyCode === ENTER_KEY) {
				todoBloc.dispatch({
					type: 'submit_edit',
					text: editInput.current.value
				})
			}
			else if (event.keyCode === ESCAPE_KEY) {
				todoBloc.dispatch({ type: 'cancel_edit' })
			}
		}
	}
	const handleDestroy = () => todoBloc.dispatch({
		type: 'destroy',
		index
	})

	return (
		<li className={[todo.completed ? 'completed' : '', editing ? 'editing' : ''].join(' ')} style={{ display: hidden ? 'none' : 'block' }}>
			<div className='view'>
				<input className='toggle'
					type='checkbox'
					checked={todo.completed}
					onChange={handleToggleCompleted} />
				<label onDoubleClick={handleEdit}>{todo.text}</label>
				<button className='destroy' onClick={handleDestroy} />
			</div>
			<input className='edit'
				ref={editInput}
				onBlur={handleSubmitEdit}
				onKeyDown={handleEditKeyDown} />
		</li>
	)
}

export default Todo
