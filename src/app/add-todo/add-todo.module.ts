import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from '../todo-list/todos.reducers';
import { AddTodoComponent } from './add-todo.component';
@NgModule({
  declarations: [AddTodoComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    StoreModule.forFeature("todos", todosReducer),
  ],
})
export class AddTodoModule {}
