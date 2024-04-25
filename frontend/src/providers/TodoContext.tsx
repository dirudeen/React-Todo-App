import { createContext } from "react";
import { Todo } from "../types/TodoModel";

interface ContextModel {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

export const context = createContext<ContextModel>({
  todos: [],
  setTodos: () => {},
});
