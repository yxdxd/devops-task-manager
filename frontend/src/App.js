import { useState, useEffect } from "react";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:8000";

  const loadTasks = async () => {
    const res = await fetch(API + "/tasks");
    const data = await res.json();
    setTasks(data.tasks);
  };

  const createTask = async () => {
    await fetch(API + "/tasks?title=" + title, {
      method: "POST"
    });

    setTitle("");
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>DevOps Task Manager</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <button onClick={createTask}>Create task</button>

      <h2>Tasks</h2>

      <ul>
        {tasks.map((task) => (
          <li key={task[0]}>
            {task[1]} — {task[2]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;