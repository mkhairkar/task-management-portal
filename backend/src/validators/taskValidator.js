const { body } = require("express-validator");

const taskValidationRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 150 })
    .withMessage("Title must be between 3 and 150 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("status")
    .isIn(["Pending", "In Progress", "Completed"])
    .withMessage("Invalid status"),

  body("priority")
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority"),

  body("due_date")
    .isISO8601()
    .withMessage("Invalid date")
    .custom((value) => {
      const dueDate = new Date(value);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (dueDate < today) {
        throw new Error("Due date cannot be in the past");
      }

      return true;
    }),
];

module.exports = {
  taskValidationRules,
};