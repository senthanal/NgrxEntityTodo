import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { AppState } from '../reducers';
import { loadAllTodos } from './todos.actions';
import { areTodosLoaded } from './todos.selectors';

@Injectable()
export class TodosResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(areTodosLoaded),
      tap((todosLoaded) => {
        if (!this.loading && !todosLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllTodos());
        }
      }),
      filter((todosLoaded) => todosLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
