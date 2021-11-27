import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../models/Todo';
import { AppState } from '../app.reducer';
import { todoSelected } from './todos.actions';
import { selectAllTodos } from './todos.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.todos$ = this.store.pipe(select(selectAllTodos));
  }

  selectedTodo(todo: Todo): void {
    this.store.dispatch(todoSelected({ todoId: todo.id }));
    this.router.navigate(['/todo/', todo.id]);
  }
}
