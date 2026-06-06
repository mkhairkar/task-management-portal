const pool = require("../config/db");

const createTask = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, status, priority, due_date } = req.body;

    const result = await pool.query(
      `INSERT INTO tasks
       (title, description, status, priority, due_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, status, priority, due_date]
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
};

const getTasks = async (req, res) => {
    try {
      const {
        search,
        status,
        priority,
        page = 1,
        limit = 5,
      } = req.query;
  
      let query = `
        SELECT *
        FROM tasks
        WHERE 1=1
      `;
  
      const values = [];
  
      if (search) {
        values.push(`%${search}%`);
        query += ` AND title ILIKE $${values.length}`;
      }
  
      if (status) {
        values.push(status);
        query += ` AND status = $${values.length}`;
      }
  
      if (priority) {
        values.push(priority);
        query += ` AND priority = $${values.length}`;
      }
  
      query += ` ORDER BY created_at DESC`;
  
      const offset = (page - 1) * limit;
  
      values.push(limit);
      query += ` LIMIT $${values.length}`;
  
      values.push(offset);
      query += ` OFFSET $${values.length}`;
  
      const result = await pool.query(query, values);
  
      res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        totalRecords: result.rowCount,
        page: Number(page),
        limit: Number(limit),
        data: result.rows,
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Failed to fetch tasks",
      });
    }
  };

const getTaskById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await pool.query(
        "SELECT * FROM tasks WHERE id = $1",
        [id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Task fetched successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Failed to fetch task",
      });
    }
  };

  const updateTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const {
        title,
        description,
        status,
        priority,
        due_date,
      } = req.body;
  
      const result = await pool.query(
        `UPDATE tasks
         SET
           title = $1,
           description = $2,
           status = $3,
           priority = $4,
           due_date = $5,
           updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING *`,
        [
          title,
          description,
          status,
          priority,
          due_date,
          id,
        ]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Failed to update task",
      });
    }
  };

  const deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
  
      const result = await pool.query(
        `DELETE FROM tasks
         WHERE id = $1
         RETURNING *`,
        [id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: result.rows[0],
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: "Failed to delete task",
      });
    }
  };

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
