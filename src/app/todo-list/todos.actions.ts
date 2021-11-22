import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/Todo';

export const loadAllTodos = createAction('[Todos Resolver] Load all todos');

export const allTodosLoaded = createAction(
  '[Todos Resolver] All todos loaded',
  props<{ todos: Todo[] }>()
);
