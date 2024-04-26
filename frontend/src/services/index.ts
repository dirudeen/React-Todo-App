const baseUrl = "http://localhost:5000/api";

export const getTodos = async () => {
  try {
    const res = await fetch(`${baseUrl}/todos`);
    if (!res.ok) throw new Error("Failed to add Todo");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const addTodo = async (text: string) => {
  try {
    const res = await fetch(`${baseUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, completed: false }),
    });
    if (!res.ok) throw new Error("Failed to add Todo");
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const toggleTodo = async (id: number, completed: boolean) => {
  await fetch(`${baseUrl}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: !completed }),
  });
};

export const removeTodo = async (id: number) => {
  await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
  });
};
