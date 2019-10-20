import { Observable, of, empty } from 'rxjs'
import { Bloc } from 'rx-bloc'

// Events

interface HydrateTodoEvent {
	type: 'hydrate',
	todos: TodoData[]
}

enum TodoFilter {
	ALL,
	ACTIVE,
	COMPLETED
}

interface SetFilterTodoEvent {
	type: 'set_filter',
	filter: TodoFilter
}

interface AddTodoEvent {
	type: 'add'
	text: string
}

interface ToggleAllTodoEvent {
	type: 'toggle_all'
}

interface ToggleCompletedTodoEvent {
	type: 'toggle_completed',
	index: number
}

interface EditTodoEvent {
	type: 'edit',
	index: number
}

interface SubmitEditTodoEvent {
	type: 'submit_edit',
	text: string
}

interface CancelEditTodoEvent {
	type: 'cancel_edit'
}

interface DestroyTodoEvent {
	type: 'destroy',
	index: number
}

interface ClearCompletedTodoEvent {
	type: 'clear_completed'
}

type TodoEvent = HydrateTodoEvent | SetFilterTodoEvent | AddTodoEvent | ToggleAllTodoEvent | ToggleCompletedTodoEvent | EditTodoEvent | SubmitEditTodoEvent | CancelEditTodoEvent | DestroyTodoEvent | ClearCompletedTodoEvent

// States

interface TodoData {
	text: string
	completed: boolean
}

interface TodoState {
	filter: TodoFilter,
	todos: TodoData[]
	editing: number
}

// Bloc

class TodoBloc extends Bloc<TodoEvent, TodoState> {
	public constructor() {
		super(() => ({
			filter: TodoFilter.ALL,
			todos: [],
			editing: -1
		}))
	}

	protected _mapEventToState(event: TodoEvent): Observable<TodoState> {
		switch (event.type) {
			case 'hydrate':
				return of({
					...this.currentState,
					todos: event.todos
				})
			case 'set_filter':
				return of({
					...this.currentState,
					filter: event.filter
				})
			case 'add': {
				const trimmedText = event.text.trim()
				if (!trimmedText) {
					return empty()
				}

				return of({
					...this.currentState,
					todos: this.currentState.todos.concat({
						text: event.text,
						completed: false
					})
				})
			}
			case 'toggle_all':
				const allComplete = this.currentState.todos.find(todo => !todo.completed) === undefined
				return of({
					...this.currentState,
					todos: this.currentState.todos.map(todo => ({
						...todo,
						completed: !allComplete
					}))
				})
			case 'toggle_completed':
				return of({
					...this.currentState,
					todos: this.currentState.todos.map((todo: TodoData, index: number) => {
						if (index === event.index) {
							return { ...todo, completed: !todo.completed }
						}

						return todo
					})
				})
			case 'edit':
				return of({
					...this.currentState,
					editing: event.index
				})
			case 'submit_edit': {
				const trimmedText = event.text.trim()

				if (trimmedText) {
					return of({
						...this.currentState,
						todos: this.currentState.todos.map((todo: TodoData, index: number) => {
							if (index === this.currentState.editing) {
								return { ...todo, text: event.text }
							}

							return todo
						}),
						editing: -1
					})
				}
				else {
					return of({
						...this.currentState,
						todos: this.currentState.todos.filter((_, index) => index !== this.currentState.editing),
						editing: -1
					})
				}
			}
			case 'cancel_edit':
				return of({
					...this.currentState,
					editing: -1
				})
			case 'destroy':
				return of({
					...this.currentState,
					todos: this.currentState.todos.filter((_, index: number) => index !== event.index)
				})
			case 'clear_completed':
				return of({
					...this.currentState,
					todos: this.currentState.todos.filter(todo => !todo.completed)
				})
		}

		return empty()
	}
}

export { TodoEvent, TodoState, TodoFilter, TodoData, TodoBloc as default }
