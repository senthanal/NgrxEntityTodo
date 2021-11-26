import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Todo } from '../models/Todo';
import { AppState } from '../reducers/index';
import { addTodo } from './add-todo.actions';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    const value: Todo = this.form.getRawValue();
    if (value.title || value.content) {
      this.store.dispatch(
        addTodo({
          todo: {
            id: new Date().getTime(),
            title: value.title,
            content: value.content,
          } as Todo,
        })
      );
    }
  }
}
