import { container, BlocKey } from 'rx-bloc'

import TodoBloc, { TodoEvent, TodoState } from './TodoBloc'

const TODO: BlocKey<TodoEvent, TodoState> = { symbol: Symbol('todo') }
container.register(TODO, new TodoBloc())

export { TODO }
