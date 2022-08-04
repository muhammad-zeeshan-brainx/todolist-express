const TaskListModel = require('../models/TaskList');

const getAllTasks = function (filter) {
  return new Promise((resolve, reject) => {
    TaskListModel.aggregate([{ $match: {} }])
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const calculateNewId = function () {
  return new Promise((resolve, reject) => {
    TaskListModel.find({})
      .sort({ id: -1 })
      .limit(1)
      .then((lastDocument) => {
        console.log(lastDocument);
        let id;
        if (lastDocument.length === 0) id = 1;
        else id = lastDocument[0].id + 1;
        resolve(id);
      })
      .catch((error) => {
        error.message = `error while generating id for new document`;
        reject(error);
      });
  });
};

const createTask = async function (data, id) {
  return new Promise((resolve, reject) => {
    const newTask = {
      id: id,
      name: data.name,
      description: data.description,
      status: data.status,
    };
    const task = new TaskListModel(newTask);
    task
      .save()
      .then((task) => {
        resolve(task);
      })
      .catch((error) => reject(error));
  });
};

const getTask = async function (id) {
  return new Promise((resolve, reject) => {
    TaskListModel.aggregate([{ $match: { id: id } }])
      .then((task) => {
        if (task.length == 0) {
          throw new Error(`No record found with id ${id}`);
        }
        resolve(task);
      })
      .catch((error) => reject(error));
  });
};

const updateTask = async function (id, data) {
  return new Promise((resolve, reject) => {
    TaskListModel.updateOne(
      { id: id },
      { $set: { name: data.name, description: data.description } }
    )
      .then(() => {
        getTask(id)
          .then((task) => {
            resolve(task);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        error.message = `No record found with id ${id}`;
        reject(error);
      });
  });
};

const deleteTask = async function (id) {
  return new Promise((resolve, reject) => {
    TaskListModel.deleteOne({ id: id })
      .then((task) => {
        if (task.deletedCount == 0)
          throw new Error(`No record found with id ${id}`);
        resolve(task);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  calculateNewId,
};
