import React, { useEffect, useState } from "react";
import { Todo } from "../types/TodoModel";
import { getTodos } from "../services";
import { context } from "./TodoContext";

export function TodoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };

    fetchTodos();
  }, []);

  const contextValue = {
    todos,
    setTodos,
  };

  return <context.Provider value={contextValue}>{children}</context.Provider>;
}
