'use client';
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

const initialTask = { id: 1, text: 'Todo Test', completed: false };

export default function Home() {
  const [allTasks, setAllTasks] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [initialTask];
    } else {
      return [initialTask];
    }
  });
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('tasks', JSON.stringify(allTasks));
    }
  }, [allTasks]);

  const handleChange = (e) => {
    setNewTaskText(e.target.value);
  };

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        completed: false,
      };
      setAllTasks((prevTasks) => [newTask, ...prevTasks]);
      setNewTaskText('');
    }
  };

  const handleToggleTask = (id) => {
    setAllTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
    );
  };

  const handleDeleteTask = (id) => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filteredTasks = allTasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const clearCompleted = () => {
    setAllTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">TODO</h1>
        </div>
        <div className="mb-4 flex items-center">
          <input
              type="text"
              className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
              placeholder="What to do ?"
              value={newTaskText}
              onChange={handleChange}
          />
          <button
              onClick={handleAddTask}
              className="bg-blue-500 text-white p-4 rounded ml-4"
          >
            Add Task
          </button>
        </div>
        <div className="bg-gray-800 rounded p-4">
          <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
          />
          <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
            <span>{allTasks.filter(task => !task.completed).length} items left</span>
            <div>
              <button
                  onClick={() => setFilter('all')}
                  className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}
              >
                All
              </button>
              <button
                  onClick={() => setFilter('active')}
                  className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}
              >
                Active
              </button>
              <button
                  onClick={() => setFilter('completed')}
                  className={`${filter === 'completed' ? 'text-white' : ''}`}
              >
                Completed
              </button>
            </div>
            <button
                onClick={clearCompleted}
                className="text-gray-400 hover:text-white"
            >
              Clear Completed
            </button>
          </div>
        </div>
      </div>
  );
}
