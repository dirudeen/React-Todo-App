import React, { useContext, useState } from "react";
import { addTodo } from "../services";
import { Todo } from "../types/TodoModel";
import { context } from "../providers/TodoContext";

export function TodoForm() {
  const [enteredTodo, setEnteredTodo] = useState("");
  const { setTodos, todos } = useContext(context);

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (enteredTodo.trim().length > 0) {
      const newTodo = (await addTodo(enteredTodo)) as Todo;
      setTodos([...todos, newTodo]);
      setEnteredTodo("");
    }
  };
  return (
    <form
      onSubmit={handleAddTodo}
      className="flex items-center w-[30rem] gap-8 mb-8"
    >
      <input
        type="text"
        value={enteredTodo}
        onChange={(e) => setEnteredTodo(e.target.value)}
        placeholder="Enter a task"
        className=" flex-1 bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
