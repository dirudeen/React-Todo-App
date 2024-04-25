const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");

const port = 3000;

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
// Endpoint to get all todos
app.get("/todos", (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading todos:", err);
      res.status(500).send("Error reading todos");
      return;
    }
    res.json(JSON.parse(data));
  });
});

// Endpoint to add a new todo
app.post("/todos", (req, res) => {
  const { text, completed } = req.body;

  if (!text) {
    res.status(400).send("Todo text is required");
    return;
  }
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading todos:", err);
      res.status(500).send("Error reading todos");
      return;
    }
    const todos = JSON.parse(data);
    const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = { id, text, completed };
    todos.push(newTodo);
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) {
        console.error("Error writing todo:", err);
        res.status(500).send("Error writing todo");
        return;
      }
      res.json(newTodo);
    });
  });
});

// Endpoint to update a todo
app.patch("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { completed } = req.body;

  if (isNaN(id)) {
    res.status(400).send("Invalid todo id");
    return;
  }

  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading todos");
      res.status(500).send("Error reading todos");
      return;
    }

    let todos = JSON.parse(data);

    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return res.status(404).send("Todo not found");

    const existingTodo = todos[index];
    existingTodo.completed = completed;

    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) {
        console.error("Error writing todos:", err);
        res.status(500).send("Error writing todos");
        return;
      }
      res.sendStatus(204);
    });
  });
});

// Endpoint to delete a todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid todo id");
    return;
  }
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading todos:", err);
      res.status(500).send("Error reading todos");
      return;
    }
    let todos = JSON.parse(data);
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      res.status(404).send("Todo not found");
      return;
    }
    todos = todos.filter((todo) => todo.id !== id);
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) {
        console.error("Error writing todos:", err);
        res.status(500).send("Error writing todos");
        return;
      }
      res.sendStatus(200);
    });
  });
});

app.listen(port, () => {
  console.log("Server is running at port " + port);
});
