# 📌 Task Management Portal

A full-stack Task Management application built using React, Node.js, Express, and PostgreSQL.  
It supports full CRUD operations with search, filter, pagination, and validation.

---

## 🚀 Features

- Create tasks
- View all tasks
- Update tasks
- Delete tasks
- Search tasks by title
- Filter by status and priority
- Pagination support
- Form validation
- REST API integration

---

## 🛠 Tech Stack

**Frontend:** React, Axios, Vite  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL  

---

## 📂 Project Structure

task-management-portal/
│
├── backend/
├── frontend/
├── database.sql
├── screenshots/
├── Task-Management-API.postman_collection.json

---

## ⚙️ Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev

Create .env file:

PORT=3001
DATABASE_URL=your_postgres_connection_string

Frontend
cd frontend
npm install
npm run dev
📡 API Endpoints
GET /api/tasks
GET /api/tasks/:id
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
🧪 Database Schema
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'Pending',
    priority VARCHAR(20) DEFAULT 'Medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
📸 Screenshots

Add your screenshots in /screenshots folder.

📌 Future Improvements
JWT Authentication
Role-based access control
Dashboard analytics
Deployment (Vercel + Render)
👨‍💻 Author

Mayur Khairkar
