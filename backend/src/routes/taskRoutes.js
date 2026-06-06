const express = require("express");
const router = express.Router();
const validate = require("../middleware/validationMiddleware");
const { createTask, getTasks, getTaskById, updateTask, deleteTask} = require("../controllers/taskController");
const {
    taskValidationRules,
  } = require("../validators/taskValidator");

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

router.post(
    "/",
    taskValidationRules,
    validate,
    createTask
  );

  router.put(
    "/:id",
    taskValidationRules,
    validate,
    updateTask
  );

module.exports = router;
