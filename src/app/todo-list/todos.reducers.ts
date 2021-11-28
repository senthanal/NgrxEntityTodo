import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { addTodo } from '../add-todo/add-todo.actions';
import { updateTodo } from '../edit-todo/edit-todo.actions';
import { Todo } from '../models/Todo';
import { deleteTodo, loadTodos, todoSelected } from './todos.actions';

export const featureKey = 'todos';
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
  on(loadTodos, (state, action) =>
    adapter.setAll(action.todos, { ...state, allTodosLoaded: true })
  ),
  on(addTodo, (state, action) => {
    return adapter.addOne(action.todo, state);
  }),
  on(todoSelected, (state, { todoId }) => {
    return { ...state, selectedTodoId: todoId };
  }),
  on(updateTodo, (state, action) => {
    return adapter.updateOne(action.update, state);
  }),
  on(deleteTodo, (state, action) => {
    return adapter.removeOne(String(state.selectedTodoId), state);
  })
);

export const { selectAll, selectTotal, selectEntities } =
  adapter.getSelectors();

export const todosFeature = createFeature({
  name: featureKey,
  reducer: todosReducer,
});
