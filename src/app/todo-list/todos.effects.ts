import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { addTodo } from '../add-todo/add-todo.actions';
import { allTodosLoaded, fetchTodos } from './todos.actions';
import { selectAllTodos } from './todos.selectors';

@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchTodos),
      map((_action) => []),
      map((todos) => allTodosLoaded({ todos }))
    )
  );
  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      concatLatestFrom(() => this.store.select(selectAllTodos)),
      map(([action, todos]) =>
        allTodosLoaded({ todos: [...todos, action.todo] })
      )
    )
  );
  constructor(private actions$: Actions, private store: Store) {}
}
