const express = require("express");
const app = new express();
const port = 3000;

app.use(express.json());

const taskList = [
  { id: 1, name: "task1", description: "this is task1 description" },
  { id: 2, name: "task2", description: "this is my task 2 in the list" },
];

app.get("/tasks", (req, res) => {
  res.status(200).send({
    statusCode: 200,
    status: "success",
    tasks: taskList,
  });
});

app.post("/tasks", (req, res) => {
  console.log(taskList.length);
  const id = taskList[taskList.length - 1].id + 1;
  console.log(id);
  const taskName = req.body.name;
  const taskDescription = req.body.description;

  const newTask = { id: id, name: taskName, description: taskDescription };
  taskList.push(newTask);

  res.status(200).send({
    statusCode: 200,
    status: "success",
    message: `successully created new task`,
    task: newTask,
  });
});

app.get("/tasks/:id", (req, res) => {
  console.log(req.params.id);
  id = Number(req.params.id);
  let flag = false;
  for (task of taskList) {
    if (task.id === id) {
      res.status(200).send({
        statusCode: 200,
        status: "success",
        task,
      });
      return;
    }
  }
  res.status(404).send({
    statusCode: 404,
    status: "Fail",
    message: `404 not found any record with id ${id}`,
  });
});

app.patch("/tasks/:id", (req, res) => {
  id = Number(req.params.id);
  let flag = false;
  for (task of taskList) {
    if (task.id === id) {
      task.name = req.body.name;
      task.description = req.body.description;
      res.status(200).send({
        statusCode: 200,
        status: "success",
        message: `successully updated the task`,
        task,
      });
      return;
    }
  }
  res.status(404).send({
    statusCode: 404,
    status: "Fail",
    message: `404 not found any record with id ${id}`,
  });
});

app.delete("/tasks/:id", (req, res) => {
  id = Number(req.params.id);
  let flag = false;

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      task = taskList[i];
      taskList.splice(i, 1);
      res.status(200).send({
        statusCode: 200,
        status: "success",
        message: "successfully deleted the item",
        task,
      });
      return;
    }
  }

  res.send({
    statusCode: 404,
    status: "Fail",
    message: `404 not found any record with id ${id}`,
  });
});

app.listen(port, () => console.log(`server started at port ${port}`));
