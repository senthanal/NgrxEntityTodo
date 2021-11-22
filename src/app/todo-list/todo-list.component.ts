import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { AppState } from '../reducers';
import { selectAllTodos } from './todos.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.todos$ = this.store.pipe(select(selectAllTodos));
  }
}
