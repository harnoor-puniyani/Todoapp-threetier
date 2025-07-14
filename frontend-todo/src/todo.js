import { useState, useEffect } from "react";
import React from "react";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTasks, setNewInputTasks] = useState("");

  const backendurl = "http://localhost:5000";
  //initial load

  function getTasks() {
    fetch(`${backendurl}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedTasks = data.map((t) => ({
          task: JSON.parse(t).task,
          completed: JSON.parse(t).completed,
          id: JSON.parse(t).id
        }));
        setTasks(formattedTasks);
      })
      .catch((err) => console.log("Error fetching tasks:", err));
  }

  function createTasks(taskDescription) {
    fetch(`${backendurl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: taskDescription,
      }),
    })
      .then((res) => {
        console.log(res.body);
        getTasks();
      })
      .catch((err) => {console.log(err);
        getTasks();
      });
  }

  function AddTask(sometask) {
    createTasks(sometask);
    setNewInputTasks("");
    getTasks();
  }

  function toggleStatus(id, task, completed) {
    fetch(`${backendurl}/tasks`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task,
        id: id,
        completed: completed,
      }),
    })
      .then((res) => {
        console.log(JSON.stringify(res.body));
        getTasks();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getTasks();
  }, []);
  //   getTasks();
  const maindiv = {
    minHeight: "100vh",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px", // Add padding for mobile responsiveness
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "7px",
    border: "1px solid #ccc",
    marginLeft:"5px",
    marginRight: "10px",
    marginBottom:"7px",
    fontSize: "16px",
    width:"70%"
    
  };

  const buttonStyle = {
    padding: "7px 5px 7px 5px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
    width:"20%"
  };

  const container = {
    width: "50%",
    maxWidth: "500px",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly more opaque
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    padding: "24px",
    textAlign: "center",
    backdropFilter: "blur(10px)", // Increased blur
  };

  // Professional checkbox styling
  const checkboxContainer = {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    margin: "8px 0",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "12px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const hiddenCheckbox = {
    opacity: 0,
    position: "absolute",
  };

  const customCheckbox = {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
    border: "2px solid #007bff",
    marginRight: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    flexShrink: 0,
  };

  const checkedCheckbox = {
    ...customCheckbox,
    backgroundColor: "#007bff",
    color: "white",
  };

  const taskText = {
    flex: 1,
    textAlign: "left",
    fontSize: "16px",
    color: "#333",
  };

  const completedTaskText = {
    ...taskText,
    textDecoration: "line-through",
    color: "#888",
  };

  return (
    <div style={maindiv}>
      <div style={container} align="center">
        <div
          style={{
            margin: "10px",
            padding: "5px",
            alignItems: "center",
          }}
          align="center"
        >
          <h1
            style={{
              opacity: 0.8,
              fontWeight: 1000,
            }}
          >
            TODO LIst
          </h1>
          <input
            style={inputStyle}
            type="text"
            value={newTasks}
            onChange={(e) => {
              setNewInputTasks(e.target.value);
            }}
            placeholder="Add a new task"
          />

          <button
            style={buttonStyle}
            onClick={() => {
              if (newTasks.trim() !== "") {
                AddTask(newTasks);
              }
            }}
          >
            Add
          </button>
        </div>
        <div align="center">
          {tasks.map((item) => (
            <div
              style={checkboxContainer}
            >
              <input
                style={ item.completed?checkedCheckbox:customCheckbox}
                type="checkbox"
                value={item.id}
                name={item.task}
                checked={item.completed}
                onChange={(e) => {
                  e.preventDefault();
                  toggleStatus(e.target.value, e.target.name, e.target.checked);
                }}
              />
              <label
                id={item.id}
                name={item.task}
                style={item.completed ? completedTaskText:taskText}
                onClick={(e) => {
                  e.preventDefault();
                  console.log(tasks);
                  console.log(e.target.id);
                  let x = tasks.find((i)=>( parseInt(i.id) === parseInt(e.target.id)));
                    console.log(x);
                    
                  toggleStatus(x.id,x.task,!x.completed);
                }}
              >
                {item.task}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
