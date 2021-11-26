import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { EditTodoResolver } from './edit-todo/edit-todo.resolver';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodosResolver } from './todo-list/todos.resolver';

const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    resolve: {
      todos: TodosResolver,
    },
  },
  {
    path: 'todo',
    component: AddTodoComponent,
  },
  {
    path: 'todo/:id',
    component: EditTodoComponent,
    resolve: {
      todo: EditTodoResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
