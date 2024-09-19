import React, { useState, useEffect } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
  };

  const handleAddTask = () => {
    if (input.trim()) {
      const newTask = {
        text: input,
        dateTime: getCurrentDateTime()
      };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditValue(tasks[index].text);
  };

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editIndex ? { ...task, text: editValue } : task
    );
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue('');
  };

  const handleRemoveAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>
          <i className="fas fa-plus"></i> Add
        </button>
      </div>
      <button className="remove-all-button" onClick={handleRemoveAllTasks}>
        <i className="fas fa-trash-alt"></i> Remove All Tasks
      </button>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            {editIndex === index ? (
              <div className="edit-task">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={handleUpdateTask}>
                  <i className="fas fa-check"></i>
                </button>
              </div>
            ) : (
              <div className="task-content">
                <span>{task.text}</span>
                <span className="task-date-time">{task.dateTime}</span>
              </div>
            )}
            <button
              className="edit-button"
              onClick={() => handleEditTask(index)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button
              className="delete-button"
              onClick={() => handleDeleteTask(index)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
