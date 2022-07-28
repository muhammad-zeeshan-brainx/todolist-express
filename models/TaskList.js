const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },

  name: {
    type: String,
  },

  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["complete", "incomplete"],
  },
});

const TaskListModel = mongoose.model("TaskList", taskListSchema);

module.exports = TaskListModel;
