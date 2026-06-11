const { useState, useEffect, useCallback } = React;

// ===== ICONS =====
const Icons = {
    plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
    trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    calendar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    filter: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    board: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    list: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    clock: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
};

// ===== INITIAL DATA =====
const initialTasks = [
    { id: 1, title: 'Design homepage mockup', description: 'Create wireframes and high-fidelity mockup for the landing page', status: 'done', priority: 'high', category: 'Design', date: '2024-01-10' },
    { id: 2, title: 'Set up CI/CD pipeline', description: 'Configure GitHub Actions for automated testing and deployment', status: 'in-progress', priority: 'high', category: 'DevOps', date: '2024-01-12' },
    { id: 3, title: 'Implement user authentication', description: 'Add JWT-based auth with login, register, and password reset', status: 'in-progress', priority: 'high', category: 'Backend', date: '2024-01-13' },
    { id: 4, title: 'Write API documentation', description: 'Document all REST endpoints with request/response examples', status: 'todo', priority: 'medium', category: 'Docs', date: '2024-01-15' },
    { id: 5, title: 'Optimize database queries', description: 'Profile and optimize slow queries in the dashboard module', status: 'todo', priority: 'medium', category: 'Backend', date: '2024-01-16' },
    { id: 6, title: 'Add dark mode toggle', description: 'Implement theme switching with system preference detection', status: 'todo', priority: 'low', category: 'Frontend', date: '2024-01-18' },
    { id: 7, title: 'Mobile responsive fixes', description: 'Fix layout issues on tablets and mobile devices', status: 'in-progress', priority: 'medium', category: 'Frontend', date: '2024-01-14' },
    { id: 8, title: 'Unit tests for payment module', description: 'Write comprehensive tests for payment processing logic', status: 'todo', priority: 'high', category: 'Testing', date: '2024-01-20' },
];

// ===== TASK CARD COMPONENT =====
function TaskCard({ task, onToggle, onDelete }) {
    const priorityColors = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' };
    const categoryColors = { Design: '#a78bfa', DevOps: '#f97316', Backend: '#6366f1', Frontend: '#06b6d4', Docs: '#84cc16', Testing: '#ec4899' };

    return (
        <div className={`task-card ${task.status === 'done' ? 'task-done' : ''}`}>
            <div className="task-card-header">
                <button className={`task-checkbox ${task.status === 'done' ? 'checked' : ''}`} onClick={() => onToggle(task.id)}>
                    {task.status === 'done' && <Icons.check />}
                </button>
                <span className="task-category" style={{ background: `${categoryColors[task.category] || '#6b7280'}20`, color: categoryColors[task.category] || '#6b7280' }}>
                    {task.category}
                </span>
                <span className="task-priority" style={{ background: priorityColors[task.priority] }}></span>
            </div>
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <div className="task-card-footer">
                <span className="task-date"><Icons.clock /> {task.date}</span>
                <button className="task-delete" onClick={() => onDelete(task.id)}><Icons.trash /></button>
            </div>
        </div>
    );
}

// ===== ADD TASK MODAL =====
function AddTaskModal({ isOpen, onClose, onAdd }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [category, setCategory] = useState('Frontend');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd({ title, description, priority, category, status: 'todo', date: new Date().toISOString().split('T')[0] });
        setTitle('');
        setDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Add New Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title..." autoFocus />
                    </div>
                    <div className="form-field">
                        <label>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the task..." rows="3" />
                    </div>
                    <div className="form-row">
                        <div className="form-field">
                            <label>Priority</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className="form-field">
                            <label>Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Design">Design</option>
                                <option value="DevOps">DevOps</option>
                                <option value="Testing">Testing</option>
                                <option value="Docs">Docs</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-submit">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ===== STATS COMPONENT =====
function Stats({ tasks }) {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const progress = total > 0 ? Math.round((done / total) * 100) : 0;

    return (
        <div className="stats">
            <div className="stat-card">
                <span className="stat-value">{total}</span>
                <span className="stat-label">Total Tasks</span>
            </div>
            <div className="stat-card">
                <span className="stat-value stat-todo">{todo}</span>
                <span className="stat-label">To Do</span>
            </div>
            <div className="stat-card">
                <span className="stat-value stat-progress">{inProgress}</span>
                <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-card">
                <span className="stat-value stat-done">{done}</span>
                <span className="stat-label">Completed</span>
            </div>
            <div className="stat-card stat-card-wide">
                <div className="progress-info">
                    <span className="stat-label">Overall Progress</span>
                    <span className="progress-percent">{progress}%</span>
                </div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
            </div>
        </div>
    );
}

// ===== MAIN APP =====
function App() {
    const [tasks, setTasks] = useState(initialTasks);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [modalOpen, setModalOpen] = useState(false);
    const [view, setView] = useState('board');

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || task.status === filter;
        return matchesSearch && matchesFilter;
    });

    const toggleTask = useCallback((id) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, status: task.status === 'done' ? 'todo' : 'done' } : task
        ));
    }, []);

    const deleteTask = useCallback((id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    }, []);

    const addTask = useCallback((taskData) => {
        setTasks(prev => [...prev, { ...taskData, id: Date.now() }]);
    }, []);

    const columns = [
        { key: 'todo', label: 'To Do', color: '#6b7280' },
        { key: 'in-progress', label: 'In Progress', color: '#f59e0b' },
        { key: 'done', label: 'Done', color: '#22c55e' },
    ];

    return (
        <div className="app">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <span className="logo-icon">T</span>
                    <span>TaskFlow</span>
                </div>
                <nav className="sidebar-nav">
                    <a href="#" className="nav-item active"><Icons.board /> Dashboard</a>
                    <a href="#" className="nav-item"><Icons.calendar /> Calendar</a>
                    <a href="#" className="nav-item"><Icons.list /> My Tasks</a>
                </nav>
                <div className="sidebar-projects">
                    <h4>Projects</h4>
                    <div className="project-item"><span className="project-dot" style={{background: '#6366f1'}}></span> Website Redesign</div>
                    <div className="project-item"><span className="project-dot" style={{background: '#f59e0b'}}></span> Mobile App</div>
                    <div className="project-item"><span className="project-dot" style={{background: '#22c55e'}}></span> API v2.0</div>
                </div>
            </aside>

            <main className="main">
                <header className="main-header">
                    <div>
                        <h1>Project Dashboard</h1>
                        <p className="header-subtitle">Track and manage your team's tasks</p>
                    </div>
                    <button className="btn-add" onClick={() => setModalOpen(true)}>
                        <Icons.plus /> Add Task
                    </button>
                </header>

                <Stats tasks={tasks} />

                <div className="toolbar">
                    <div className="search-box">
                        <Icons.search />
                        <input type="text" placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="toolbar-right">
                        <div className="filter-group">
                            <Icons.filter />
                            {['all', 'todo', 'in-progress', 'done'].map(f => (
                                <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                                    {f === 'all' ? 'All' : f === 'in-progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="view-toggle">
                            <button className={view === 'board' ? 'active' : ''} onClick={() => setView('board')}><Icons.board /></button>
                            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><Icons.list /></button>
                        </div>
                    </div>
                </div>

                {view === 'board' ? (
                    <div className="board">
                        {columns.map(col => (
                            <div key={col.key} className="board-column">
                                <div className="column-header">
                                    <span className="column-dot" style={{ background: col.color }}></span>
                                    <h3>{col.label}</h3>
                                    <span className="column-count">{filteredTasks.filter(t => t.status === col.key).length}</span>
                                </div>
                                <div className="column-tasks">
                                    {filteredTasks.filter(t => t.status === col.key).map(task => (
                                        <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="list-view">
                        {filteredTasks.map(task => (
                            <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                        ))}
                    </div>
                )}
            </main>

            <AddTaskModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onAdd={addTask} />
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);