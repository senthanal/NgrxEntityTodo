import { addTodo } from './add-todo/add-todo.actions';
import { todoUpdated } from './edit-todo/edit-todo.actions';
import * as TodosActions from './todo-list/todos.actions';
export const TodoActions = {addTodo, todoUpdated};
export { TodosActions };
