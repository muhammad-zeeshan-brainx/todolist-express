const taskList = [
  { id: 1, name: "task1", description: "this is task1 description" },
  { id: 2, name: "task2", description: "this is my task 2 in the list" },
];
exports.validateId = function (req, res, next) {
  const id = Number(req.params.id);
  let flag = false;
  for (const task of taskList) {
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
};

exports.getAllTasks = function (req, res) {
  res.status(200).send({
    statusCode: 200,
    status: "success",
    tasks: taskList,
  });
};

exports.createTask = function (req, res) {
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
};

exports.getTask = function (req, res, task) {
  task = req.body.task;
  res.status(200).send({
    statusCode: 200,
    status: "Success",
    task,
  });
};

exports.updateTask = function (req, res) {
  const task = req.body.task;
  task.name = req.body.name;
  task.description = req.body.description;

  res.status(200).send({
    statusCode: 200,
    status: "success",
    message: `successully updated the task`,
    task,
  });
};

exports.deleteTask = function (req, res) {
  const task = req.body.task;

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
};
