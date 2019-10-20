import * as React from 'react'
import { render } from 'react-dom'
import { map, distinctUntilChanged } from 'rxjs/operators'
import { container } from 'rx-bloc'

import router from 'router'
import { load, persist } from 'storage'

import { TODO } from 'blocs'
import { TodoFilter } from 'blocs/TodoBloc'

import App from 'components/App'

const todoBloc = container.get(TODO)

switch (router.getRoute(0)) {
	case 'active':
		todoBloc.dispatch({
			type: 'set_filter',
			filter: TodoFilter.ACTIVE
		})
		break
	case 'completed':
		todoBloc.dispatch({
			type: 'set_filter',
			filter: TodoFilter.COMPLETED
		})
		break
}

router.on('/', () => todoBloc.dispatch({
	type: 'set_filter',
	filter: TodoFilter.ALL
}))
router.on('/active', () => todoBloc.dispatch({
	type: 'set_filter',
	filter: TodoFilter.ACTIVE
}))
router.on('/completed', () => todoBloc.dispatch({
	type: 'set_filter',
	filter: TodoFilter.COMPLETED
}))

const todos = load()
todoBloc.dispatch({
	type: 'hydrate',
	todos
})
todoBloc.state.pipe(
	map(state => state.todos),
	distinctUntilChanged()
).subscribe(persist)

render(<App />, document.querySelector('section.todoapp'))

