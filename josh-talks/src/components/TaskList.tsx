// components/TaskList.tsx
import React, { useState } from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState<{ title: string; description: string; priority: 'high' | 'medium' | 'low' }>({
    title: '',
    description: '',
    priority: 'medium',
  });
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Add or update a task
  const handleTaskSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newTask.title.trim() === '') return;

    if (editingTaskId !== null) {
      // Update the task if editing
      setTasks(tasks.map((task) => (task.id === editingTaskId ? { ...task, ...newTask } : task)));
      setEditingTaskId(null);
    } else {
      // Add a new task
      const newTaskObj: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
    }

    setNewTask({ title: '', description: '', priority: 'medium' }); // Reset form
  };

  // Delete a task
  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle completion status
  const toggleComplete = (id: number): void => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  // Edit task by setting it in the form
  const editTask = (id: number): void => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setNewTask({
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
      });
      setEditingTaskId(id);
    }
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1; // Completed tasks at bottom
    if (a.priority === 'high') return -1;
    if (a.priority === 'medium' && b.priority === 'low') return -1;
    return 1;
  });

  return (
    <div className="container">
      <h1>Task Management</h1>

      <input
        className="search-bar"
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Task description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'high' | 'medium' | 'low' })}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
      </form>

      <ul className="task-list">
        {sortedTasks.map((task) => (
          <li key={task.id} className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
            </div>
            <div>
              <button onClick={() => toggleComplete(task.id)}>
                {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
              </button>
              <button onClick={() => editTask(task.id)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
