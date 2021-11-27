import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { AppState } from '../app.reducer';
import { fetchTodos } from './todos.actions';
import { areTodosLoaded } from './todos.selectors';

@Injectable()
export class TodosResolver implements Resolve<boolean> {
  loading = false;
  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(areTodosLoaded),
      tap((todosLoaded) => {
        if (!this.loading && !todosLoaded) {
          this.loading = true;
          this.store.dispatch(fetchTodos());
        }
      }),
      filter((todosLoaded) => todosLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
