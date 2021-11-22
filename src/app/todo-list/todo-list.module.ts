import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TodoComponent } from '../todo/todo.component';
import { TodoListComponent } from './todo-list.component';
import { TodosEffects } from './todos.effects';
import { todosReducer } from './todos.reducers';
import { TodosResolver } from './todos.resolver';

@NgModule({
  declarations: [TodoListComponent, TodoComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    EffectsModule.forFeature([TodosEffects]),
    StoreModule.forFeature('todos', todosReducer),
  ],
  providers: [TodosResolver],
})
export class TodoListModule {}
