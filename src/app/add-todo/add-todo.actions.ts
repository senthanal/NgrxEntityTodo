import { createAction, props } from "@ngrx/store";
import { Todo } from "../models/Todo";

export const addTodo = createAction(
    "[Add Todo Page] Add Todo",
    props<{todo: Todo}>()
);
