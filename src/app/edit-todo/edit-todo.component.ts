import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, filter } from 'rxjs';
import { Todo } from '../models/Todo';
import { AppState } from '../reducers';
import { updateTodo } from './edit-todo.actions';
@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
})
export class EditTodoComponent implements OnInit {
  todo!: Todo;
  titleControl = new FormControl();
  contentControl = new FormControl();
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.titleControl.valueChanges,
      this.contentControl.valueChanges,
    ])
      .pipe(
        filter(([title, content]) => title !== undefined || content !== undefined),
        debounceTime(400)
      )
      .subscribe(([title, content]) =>
        this.updateStore({ id: this.todo.id, title, content })
      );
    this.activatedRoute.data.subscribe((data) => {
      this.todo = data['todo'];
      this.titleControl.setValue(data['todo'].title);
      this.contentControl.setValue(data['todo'].content);
    });
  }

  updateStore(updatedTodo: Partial<Todo>): void {
    const t: Todo = { ...this.todo, ...updatedTodo };
    const update: Update<Todo> = {
      id: t.id,
      changes: t,
    };
    this.store.dispatch(updateTodo({ update }));
  }
}
