import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { TodoActions, TodosActions } from '../action-types';
import { Todo } from '../models/Todo';
import { selectAllTodos } from './todos.selectors';

@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.fetchTodos),
      map((_action) => []),
      map((todos) => TodosActions.allTodosLoaded({ todos }))
    )
  );
  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      concatLatestFrom(() => this.store.select(selectAllTodos)),
      map(([action, todos]) =>
        TodosActions.allTodosLoaded({ todos: [...todos, action.todo] })
      )
    )
  );
  constructor(private actions$: Actions, private store: Store) {}
}
