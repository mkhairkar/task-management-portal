import { useState, useEffect } from "react";
import api from "../api/taskApi";

function TaskForm({ selectedTask, setSelectedTask, triggerRefresh }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    due_date: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title,
        description: selectedTask.description,
        status: selectedTask.status,
        priority: selectedTask.priority,
        due_date: selectedTask.due_date.split("T")[0],
      });
      setErrors({});
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3 || formData.title.length > 150) {
      newErrors.title = "Title must be between 3 and 150 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.due_date) {
      newErrors.due_date = "Due date is required";
    } else {
      const today = new Date().toISOString().split("T")[0];

      if (formData.due_date < today) {
        newErrors.due_date = "Due date cannot be in the past";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      if (selectedTask) {
        await api.put(`/tasks/${selectedTask.id}`, formData);

        setMessage("Task Updated Successfully");

        setSelectedTask(null);
      } else {
        await api.post("/tasks", formData);

        setMessage("Task Created Successfully");
      }
      triggerRefresh();

      setFormData({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        due_date: "",
      });
    } catch (error) {
      setMessage("Operation Failed");
    }
  };

  return (
    <div>
      <h2>{selectedTask ? "Edit Task" : "Create Task"}</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        <br />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <p style={{ color: "red" }}>{errors.description}</p>
        )}
        <br />
        <br />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <br />
        <br />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <br />
        <br />
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
        />
        {errors.due_date && <p style={{ color: "red" }}>{errors.due_date}</p>}
        <br />
        <br />
        <button type="submit">
          {selectedTask ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
