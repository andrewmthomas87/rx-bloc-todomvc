import { TodoData } from './blocs/TodoBloc'

const LOCAL_STORAGE_KEY = 'todos-rx-bloc'

function load(): TodoData[] {
	const json = localStorage.getItem(LOCAL_STORAGE_KEY)
	if (json === null) {
		return []
	}
	else {
		try {
			const data = JSON.parse(json)

			return data.map((todo: any) => ({
				text: todo.text,
				completed: todo.completed
			}))
		} catch (ex) {
			localStorage.removeItem(LOCAL_STORAGE_KEY)
			return []
		}
	}
}

function persist(todos: TodoData[]) {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
}

export { load, persist }
