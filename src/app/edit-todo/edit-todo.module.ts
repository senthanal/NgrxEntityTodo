import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { StoreModule } from '@ngrx/store';
import { todosReducer } from '../todo-list/todos.reducers';
import { EditTodoComponent } from './edit-todo.component';
import { EditTodoResolver } from './edit-todo.resolver';

@NgModule({
  declarations: [EditTodoComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    ContenteditableModule,
    StoreModule.forFeature('todos', todosReducer),
  ],
  providers: [EditTodoResolver],
})
export class EditTodoModule {}
