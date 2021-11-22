import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { TodoActions, TodosActions } from '../action-types';
import { Todo } from '../models/Todo';

export interface TodosState extends EntityState<Todo> {
  allTodosLoaded: boolean;
}

export const adapter = createEntityAdapter<Todo>();

export const initialTodosState = adapter.getInitialState({
  allTodosLoaded: false,
});

export const todosReducer = createReducer(
  initialTodosState,
  on(TodosActions.allTodosLoaded, (state, action) =>
    adapter.addMany(action.todos, { ...state, allTodosLoaded: true })
  ),
  on(TodoActions.addTodo, (state, action) => {
    console.log(action, state);
    return adapter.addOne(action.todo, state);
  })
);

export const { selectAll, selectTotal } = adapter.getSelectors();
