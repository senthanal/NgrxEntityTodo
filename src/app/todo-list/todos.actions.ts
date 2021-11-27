import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/Todo';

export const fetchTodos = createAction('[Todos Resolver] Fetch all todos');

export const allTodosLoaded = createAction(
  '[Todos Resolver] All todos loaded',
  props<{ todos: Todo[] }>()
);

export const todoSelected = createAction(
  '[Todos page] Todo selected',
  props<{ todoId: number }>()
);

export const deleteTodo = createAction('[Todos page] Delete the selected todo');
