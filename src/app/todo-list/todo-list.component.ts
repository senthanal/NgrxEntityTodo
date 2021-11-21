import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTodos } from '../add-todo/add-todo.selectors';
import { Todo } from '../models/Todo';
import { AppState } from '../reducers';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
    todos$!: Observable<Todo | undefined>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
      this.todos$ = this.store.pipe(select(getTodos));
  }

}
