import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Todo } from '../models/Todo';
import { featureName, TodoState } from '../reducers/todo-reducer';

export const selectTodoState = createFeatureSelector<TodoState>(featureName);

export const getTodos = createSelector(selectTodoState, (data) => data.todo);
