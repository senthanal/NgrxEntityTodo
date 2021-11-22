import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, filter, withLatestFrom } from 'rxjs';
import { Todo } from '../models/Todo';
import { AppState } from '../reducers/index';
import { selectTotalTodos } from '../todo-list/todos.selectors';
import { addTodo } from './add-todo.actions';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const countTodos$ = this.store.pipe(select(selectTotalTodos));
    this.form.valueChanges
      .pipe(
        filter((value) => this.form.valid && value.title && value.content),
        debounceTime(400),
        withLatestFrom(countTodos$)
      )
      .subscribe(([value, countTodos]) => {
        console.log(
          'Reactive Form valid value: vm = ',
          JSON.stringify(value),
          countTodos
        );
        this.store.dispatch(
          addTodo({
            todo: {
              id: countTodos++,
              title: value.title,
              content: value.content,
            } as Todo,
          })
        );
      });
  }
}
