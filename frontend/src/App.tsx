import "./App.css";
import Layout from "./components/Layout";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { TodoContextProvider } from "./providers/TodoContextProvider";

function App() {
  return (
    <TodoContextProvider>
      <Layout>
        <h1 className="text-4xl font-semibold my-8 uppercase">Todo App</h1>

        <TodoForm />
        <TodoList />
      </Layout>
    </TodoContextProvider>
  );
}

export default App;
