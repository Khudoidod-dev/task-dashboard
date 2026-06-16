# рџ“‹ TaskFlow вЂ” Project Management Dashboard

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-brightgreen)
![API](https://img.shields.io/badge/API-Node.js%20%2B%20PostgreSQL-339933?style=flat&logo=node.js)

A feature-rich task management dashboard built with React. Includes Kanban board, filtering, search, and real-time statistics.

рџЊђ **Live Demo:** [khudoidod-dev.github.io/task-dashboard](https://khudoidod-dev.github.io/task-dashboard/)
рџ”Њ **Backend API:** [task-dashboard-api](https://github.com/Khudoidod-dev/task-dashboard-api) вЂ” Node.js + Express + PostgreSQL

## вњЁ Features

- **Kanban Board** вЂ” Drag-friendly columns: To Do, In Progress, Done
- **Task Management** вЂ” Create, complete, and delete tasks
- **Search & Filter** вЂ” Real-time search with status and priority filters
- **Statistics** вЂ” Live progress tracking with visual indicators
- **Dual View** вЂ” Switch between Board and List layouts
- **Modal Forms** вЂ” Clean task creation with priority and category
- **Responsive** вЂ” Works on desktop, tablet, and mobile

## рџ›  Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, CSS3 (Grid, Flexbox)    |
| Backend  | Node.js, Express, PostgreSQL      |
| DevOps   | Docker, Docker Compose            |

## рџљЂ Quick Start

### Frontend only

```bash
git clone https://github.com/Khudoidod-dev/task-dashboard.git
cd task-dashboard
# Open index.html in browser вЂ” no build step required
```

### Full-stack (Frontend + API + Database)

```bash
# Start the API + PostgreSQL
git clone https://github.com/Khudoidod-dev/task-dashboard-api.git
cd task-dashboard-api
docker-compose up

# API runs on http://localhost:3001
# Then open task-dashboard/index.html
```

## рџ“Ў API Endpoints

```
GET    /api/tasks           вЂ” list tasks (filter: status, priority, search)
GET    /api/tasks/stats     вЂ” statistics
POST   /api/tasks           вЂ” create task
PATCH  /api/tasks/:id       вЂ” update task
DELETE /api/tasks/:id       вЂ” delete task

GET    /api/projects        вЂ” list projects with task counts
POST   /api/projects        вЂ” create project
```

## рџ“ђ Architecture

```
Frontend (React)
в”њв”Ђв”Ђ Sidebar         вЂ” navigation, project list
в”њв”Ђв”Ђ Stats Bar       вЂ” task counters, progress
в”њв”Ђв”Ђ Toolbar         вЂ” search, filters, view toggle
в”њв”Ђв”Ђ Board View      вЂ” 3-column Kanban
в”‚   в””в”Ђв”Ђ TaskCard    вЂ” checkbox, priority, actions
в”њв”Ђв”Ђ List View       вЂ” single column
в””в”Ђв”Ђ AddTaskModal    вЂ” form with validation

Backend (Node.js + Express)
в”њв”Ђв”Ђ routes/tasks.js     вЂ” CRUD + filtering + stats
в”њв”Ђв”Ђ routes/projects.js  вЂ” CRUD with task counts
в”њв”Ђв”Ђ middleware/         вЂ” validation, error handling
в””в”Ђв”Ђ db.js               вЂ” PostgreSQL pool + schema init
```

## рџ“„ License

MIT
