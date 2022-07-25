const router = require("express").Router();

const tasksController = require("./../controllers/tasksController.js");

router.get("/", tasksController.getAllTasks);
router.post("/", tasksController.createTask);

router.get("/:id", tasksController.getTask);
router.patch("/:id", tasksController.updateTask);
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
