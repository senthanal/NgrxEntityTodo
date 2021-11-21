import { createReducer, on } from '@ngrx/store';
import { TodoActions } from '../action-types';
import { Todo } from '../models/Todo';

export const featureName = "data";

export interface TodoState {
  todo: Todo | undefined;
}

export const initialTodoState: TodoState = {
  todo: undefined,
};

export const todoReducer = createReducer(
  initialTodoState,
  on(TodoActions.addTodo, (_state, action) => {
    return { todo: action.todo };
  })
);
