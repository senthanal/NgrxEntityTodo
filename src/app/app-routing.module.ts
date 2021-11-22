import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodosResolver } from './todo-list/todos.resolver';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    resolve: {
        todos: TodosResolver
    }
  },
  {
    path: 'add-todo',
    component: AddTodoComponent,
  },
  {
    path: 'todo/:id',
    component: TodoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
