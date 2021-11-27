import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { loadTodos, fetchTodos } from './todos.actions';

@Injectable()
export class TodosEffects {
  loadTodos$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchTodos),
        map((_action) => []),
        map((todos) => loadTodos({ todos }))
      )
  );

  constructor(private actions$: Actions) {}
}
