import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { TodoActions, TodosActions } from '../action-types';
import { Todo } from '../models/Todo';

export interface TodosState extends EntityState<Todo> {
  allTodosLoaded: boolean;
  selectedTodoId: number | null;
}

export const adapter = createEntityAdapter<Todo>({
  selectId: (todo: Todo) => todo.id,
});

export const initialTodosState: TodosState = adapter.getInitialState({
  allTodosLoaded: false,
  selectedTodoId: null,
});

export const todosReducer = createReducer(
  initialTodosState,
  on(TodosActions.allTodosLoaded, (state, action) =>
    adapter.addMany(action.todos, { ...state, allTodosLoaded: true })
  ),
  on(TodoActions.addTodo, (state, action) => {
    console.log(action, state);
    return adapter.addOne(action.todo, state);
  }),
  on(TodosActions.todoSelected, (state, { todoId }) => {
    console.log(todoId, state);
    return { ...state, selectedTodoId: todoId };
  }),
  on(TodoActions.todoUpdated, (state, action) => {
    console.log(action, state);
    return adapter.updateOne(action.update, state);
  })
);

export const { selectAll, selectTotal, selectEntities, selectIds } =
  adapter.getSelectors();

export function reducer(state: TodosState | undefined, action: Action) {
  return todosReducer(state, action);
}
