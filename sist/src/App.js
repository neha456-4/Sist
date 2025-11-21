import React, { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTaskIndex, setEditTaskIndex] = useState(-1);

  const addTask = () => {
    if (task.trim() === "") return;
    if (editTaskIndex > -1) {
      const updatedTasks = tasks.map((t, index) =>
        index === editTaskIndex ? task : t
      );
      setTasks(updatedTasks);
      setEditTaskIndex(-1);
    } else {
      setTasks([...tasks, task]);
    }
    setTask("");
  };

  const setEditTask = (index) => {
    setTask(tasks[index]);
    setEditTaskIndex(index);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    if (editTaskIndex === index) {
      setTask("");
      setEditTaskIndex(-1);
    } else if (editTaskIndex > index) {
      setEditTaskIndex(editTaskIndex - 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>
          {editTaskIndex > -1 ? "Update Task" : "Add Task"}
        </button>
        <ul>
          {tasks.map((t, i) => (
            <li key={i}>
              {t} <button onClick={() => setEditTask(i)}>Edit</button>{" "}
              <button onClick={() => deleteTask(i)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
