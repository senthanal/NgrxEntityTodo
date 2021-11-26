import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, first, map, Observable, tap } from 'rxjs';
import { Todo } from '../models/Todo';
import { AppState } from '../reducers';
import { selectTodo } from '../todo-list/todos.selectors';

@Injectable()
export class EditTodoResolver implements Resolve<Todo> {
  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Todo> {
    return this.store.pipe(
      select(selectTodo),
      map((response) => response as Todo),
      filter((todo) => todo.hasOwnProperty('id')),
      tap((todo) => console.log(todo)),
      first()
    );
  }
}
