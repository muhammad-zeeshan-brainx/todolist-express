const express = require("express");
const app = new express();
const port = 3000;

app.use(express.json());

function validateId(req, res, next) {
  id = Number(req.params.id);
  let flag = false;
  for (task of taskList) {
    if (task.id === id) {
      req.body.task = task;
      next();
      return;
    }
  }
  res.status(404).send({
    statusCode: 404,
    status: "Fail",
    message: `404 not found any record with id ${id}`,
  });
}

function getAllTasks(req, res) {
  res.status(200).send({
    statusCode: 200,
    status: "success",
    tasks: taskList,
  });
}

function createTask(req, res) {
  const id = taskList[taskList.length - 1].id + 1;
  const taskName = req.body.name;
  const taskDescription = req.body.description;

  const newTask = { id: id, name: taskName, description: taskDescription };
  taskList.push(newTask);

  res.status(200).send({
    statusCode: 201,
    status: "success",
    message: `successully created new task`,
    task: newTask,
  });
}

function getTask(req, res, task) {
  task = req.body.task;
  res.status(200).send({
    statusCode: 200,
    status: "Success",
    task,
  });
}

function updateTask(req, res) {
  task = req.body.task;
  task.name = req.body.name;
  task.description = req.body.description;

  res.status(200).send({
    statusCode: 200,
    status: "success",
    message: `successully updated the task`,
    task,
  });
}

function deleteTask(req, res) {
  task = req.body.task;

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === task.id) {
      taskList.splice(i, 1);
      res.status(200).send({
        statusCode: 200,
        status: "success",
        message: "successfully deleted the item",
        task,
      });
    }
  }
}

const taskList = [
  { id: 1, name: "task1", description: "this is task1 description" },
  { id: 2, name: "task2", description: "this is my task 2 in the list" },
];

app.route("/tasks").get(getAllTasks).post(createTask);

app
  .route("/tasks/:id")
  .get(validateId, getTask)
  .patch(validateId, updateTask)
  .delete(validateId, deleteTask);

app.listen(port, () => console.log(`server started at port ${port}`));
