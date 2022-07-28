const TaskListModel = require("../models/TaskList.js");
const taskListServices = require("../services/taskListServices");

const getAllTasks = async function (req, res) {
  try {
    const taskList = await taskListServices.getAllTasks({});
    res.status(200).send({
      status: "success",
      tasks: taskList,
    });
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send("error occured");
  }
};

const createTask = async function (req, res) {
  try {
    const id = await taskListServices.calculateNewId();
    const task = await taskListServices.createTask(req.body, id);
    res.status(200).send({
      status: "success",
      message: `successully created new task`,
      task,
    });
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send("error occured");
  }
};

const getTask = async function (req, res) {
  try {
    const task = await taskListServices.getTask(Number(req.params.id));
    res.status(200).send({
      status: "Success",
      task,
    });
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      status: "Fail",
      error: error.message,
    });
  }
};

const updateTask = async function (req, res) {
  try {
    const task = await taskListServices.updateTask(
      Number(req.params.id),
      req.body
    );
    res.status(200).send({
      status: "success",
      message: `successully updated the task`,
      task,
    });
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      status: "Fail",
      error: error.message,
    });
  }
};

const deleteTask = async function (req, res) {
  try {
    task = await taskListServices.deleteTask(Number(req.params.id));
    res.status(200).send({
      status: "success",
      message: "successfully deleted the item",
    });
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      status: "Fail",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
