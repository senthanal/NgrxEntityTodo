import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { addTodo } from '../add-todo/add-todo.actions';
import { updateTodo } from '../edit-todo/edit-todo.actions';
import { Todo } from '../models/Todo';
import { allTodosLoaded, deleteTodo, todoSelected } from './todos.actions';

export interface TodosState extends EntityState<Todo> {
  allTodosLoaded: boolean;
  selectedTodoId: number | null;
}

export const adapter = createEntityAdapter<Todo>();

export const initialTodosState: TodosState = adapter.getInitialState({
  allTodosLoaded: false,
  selectedTodoId: null,
});

export const todosReducer = createReducer(
  initialTodosState,
  on(allTodosLoaded, (state, action) =>
    adapter.addMany(action.todos, { ...state, allTodosLoaded: true })
  ),
  on(addTodo, (state, action) => {
    console.log(action, state);
    return adapter.addOne(action.todo, state);
  }),
  on(todoSelected, (state, { todoId }) => {
    console.log(todoId, state);
    return { ...state, selectedTodoId: todoId };
  }),
  on(updateTodo, (state, action) => {
    console.log(action, state);
    return adapter.updateOne(action.update, state);
  }),
  on(deleteTodo, (state, action) => {
    console.log(action, state);
    return adapter.removeOne(String(state.selectedTodoId), state);
  })
);

export const { selectAll, selectTotal, selectEntities } =
  adapter.getSelectors();

export function reducer(state: TodosState | undefined, action: Action) {
  return todosReducer(state, action);
}
