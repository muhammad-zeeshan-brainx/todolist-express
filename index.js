const express = require("express");
const tasksController = require("./controllers/tasksController.js");

const app = new express();

const port = process.env.PORT || 3000;

app.use(express.json());

app
  .route("/tasks")
  .get(tasksController.getAllTasks)
  .post(tasksController.createTask);

app
  .route("/tasks/:id")
  .get(tasksController.validateId, tasksController.getTask)
  .patch(tasksController.validateId, tasksController.updateTask)
  .delete(tasksController.validateId, tasksController.deleteTask);

app.listen(port, () => console.log(`server started at port ${port}`));
