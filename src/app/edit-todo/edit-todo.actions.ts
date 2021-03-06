import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/Todo';

export const updateTodo = createAction(
  '[Edit Todo Page] Todo Updated',
  props<{ update: Update<Todo> }>()
);
