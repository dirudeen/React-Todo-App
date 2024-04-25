import { useContext } from "react";
import { TodoItem } from "./TodoItem";
import { context } from "../providers/TodoContext";

export function TodoList() {
  const { todos } = useContext(context);
  return (
    <ul className="list-none" data-cy="todos-list">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            completed={todo.completed}
            id={todo.id}
            text={todo.text}
          />
        ))
      ) : (
        <p className="mx-auto">Add your todos</p>
      )}
    </ul>
  );
}
