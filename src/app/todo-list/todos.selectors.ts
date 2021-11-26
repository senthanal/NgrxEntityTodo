import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, selectTotal, TodosState } from './todos.reducers';

export const selectTodosState = createFeatureSelector<TodosState>('todos');

export const selectAllTodos = createSelector(selectTodosState, selectAll);

export const selectTotalTodos = createSelector(selectTodosState, selectTotal);

export const areTodosLoaded = createSelector(
  selectTodosState,
  (state) => state.allTodosLoaded
);

export const getSelectedTodoId = (state: TodosState) => state.selectedTodoId;

export const selectTodo = createSelector(
  selectTodosState,
  (state) => state.selectedTodoId && state.entities[state.selectedTodoId]
);
