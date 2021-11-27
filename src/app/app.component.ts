import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, Observable, pluck } from 'rxjs';
import { AppState } from './app.reducer';
import { deleteTodo } from './todo-list/todos.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NgrxTodo';
  isListView$!: Observable<boolean>;
  isAddView$!: Observable<boolean>;
  isEditView$!: Observable<boolean>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isListView$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      pluck('url'),
      map((url) => (url === '/' ? true : false))
    );
    this.isAddView$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      pluck('url'),
      map((url: any) => url.indexOf('/todo') > -1)
    );
    this.isEditView$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      pluck('url'),
      map((url: any) => {
        return /^\/todo\/[0-9]*$/.test(url);
      })
    );
  }

  deleteTodo(): void {
    this.store.dispatch(deleteTodo());
    this.router.navigateByUrl('/');
  }
}
