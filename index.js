const express = require("express");
const app = new express();
const port = 3000;

app.use(express.json());

const taskList = [
  { id: 1, name: "task1", description: "this is task1 description" },
  { id: 2, name: "task2", description: "this is my task 2 in the list" },
];

app.get("/tasks", (req, res) => {
  res.send(taskList);
});

app.post("/tasks", (req, res) => {
  const id = taskList.length + 1;
  const taskName = req.body.name;
  const taskDescription = req.body.description;

  const newTask = { id: id, name: taskName, description: taskDescription };
  taskList.push(newTask);

  res.send(taskList);
});

app.get("/tasks/:id", (req, res) => {
  console.log(req.params);
  res.send("200 ok get");
});

app.patch("/tasks/:id", (req, res) => {
  console.log(req.params);
  res.send("200 ok patch");
});

app.delete("/tasks/:id", (req, res) => {
  console.log(req.params);
  res.send("200 ok delete");
});

app.listen(port, () => console.log(`server started at port ${port}`));
