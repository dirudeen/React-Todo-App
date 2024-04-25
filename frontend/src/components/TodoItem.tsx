import { useContext, useState } from "react";
import { removeTodo, toggleTodo } from "../services";
import { Todo } from "../types/TodoModel";
import { context } from "../providers/TodoContext";

export function TodoItem({ completed, id, text }: Todo) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const { setTodos, todos } = useContext(context);

  const handleToggleTodo = async () => {
    await toggleTodo(id, completed);
    setIsCompleted((prevState) => !prevState);
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleRemoveTodo = async () => {
    await removeTodo(id);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <li className="flex items-center w-[30rem] mb-2 p-2  border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggleTodo}
        className="size-5 "
      />
      <p className={` ml-4 ${isCompleted ? "line-through" : ""} truncate`}>
        {text}
      </p>
      <button onClick={handleRemoveTodo} className="ml-auto">
        delete
      </button>
    </li>
  );
}
