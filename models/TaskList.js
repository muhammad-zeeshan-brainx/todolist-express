const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  description: String,
});
const TaskListModel = mongoose.model("TaskList", taskListSchema);

module.exports = TaskListModel;
