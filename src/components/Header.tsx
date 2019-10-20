import * as React from 'react'
import { useState } from 'react'
import { container } from 'rx-bloc'

import { TODO } from 'blocs'

const ENTER_KEY = 13

function Header(): React.ReactElement {
	const todoBloc = container.get(TODO)

	const [text, setText] = useState('')

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.currentTarget.value)

	function handleKeyDown(event: React.KeyboardEvent) {
		if (event.keyCode === ENTER_KEY) {
			event.preventDefault()

			todoBloc.dispatch({
				type: 'add',
				text: text
			})

			setText('')
		}
	}

	return (
		<header className='header'>
			<h1>todos</h1>
			<input className='new-todo'
				placeholder='What needs to be done?'
				autoFocus
				value={text}
				onChange={handleChange}
				onKeyDown={handleKeyDown} />
		</header>
	)
}

export default Header
