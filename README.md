# 📋 TaskFlow — Project Management Dashboard

A feature-rich task management dashboard built with React. Includes Kanban board, filtering, search, and real-time statistics.

![Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black) ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)

## ✨ Features

- **Kanban Board** — Drag-friendly columns: To Do, In Progress, Done
- **Task Management** — Create, complete, and delete tasks
- **Search & Filter** — Real-time search with status filters
- **Statistics** — Live progress tracking with visual indicators
- **Dual View** — Switch between Board and List layouts
- **Modal Forms** — Clean task creation with priority and category
- **Responsive** — Sidebar navigation with project list

## 🛠 Tech Stack

- React 18 (Hooks: useState, useCallback)
- CSS3 (Grid, Flexbox, Custom Properties)
- SVG Icons (inline, no dependencies)

## 📸 Preview

The dashboard features:
- Left sidebar with navigation and projects
- Top stats bar with progress indicator  
- Kanban columns with task cards
- Search bar and filter controls

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Khudoidod-dev/task-dashboard.git

# Open in browser (no build step required)
open index.html
```

## 📐 Architecture

```
App
├── Sidebar (navigation, projects)
├── Stats (task counters, progress bar)
├── Toolbar (search, filters, view toggle)
├── Board View (3-column Kanban)
│   └── TaskCard (checkbox, category, priority, actions)
├── List View (single column)
└── AddTaskModal (form with validation)
```

## 📄 License

MIT