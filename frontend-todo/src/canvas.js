const { useState, useEffect } = require("react");

function Canvas() {
  // let tasks = [];

  const [tasks, setTasks] = useState(["eat", "sleep"]);
  const [newTasks, setNewTasks] = useState("");
  const [checked,setchecked]=useState(false);

  function AddTask(inputTask) {
    setTasks([...tasks, inputTask]);
    setNewInputTasks("");
  }
  const inputStyle = {
    padding: "10px",
    width: "250px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  };

  const listStyle = {
    listStyleType: "none",
    padding: 0,
    maxWidth: "350px",
    margin: "20px auto",
    textAlign: "left",
  };

  const listItemStyle = {
    background: "#f8f9fa",
    margin: "8px 0",
    padding: "12px 16px",
    borderRadius: "4px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  };
  function setNewInputTasks(newInput) {
    setNewTasks(newInput);
  }


  return (
    <div
      align="center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1>Todo List</h1>
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
      <div>
        <h2>Task Lists</h2>
        {tasks.map((item, index) => (
          <div
            style={{
              minWidth: "30%",
              maxWidth: "40%",
              backgroundColor: "ButtonFace",
              minHeight: "1vh",
              borderRadius: "250px",
              padding: "10px",
              margin: "10px",
              opacity: "70%",
              fontSize: "20px",
            }}
          >
            <input
              type="checkbox"
              style={{
                alignmentBaseline:"hanging",
                position:"relative",
                left:"5px",
                margin: "10px",
                marginLeft:"2px",
                padding: "7px",
                borderRadius: "50%",
                border:"0.5px solid",
                outline: "none",
                WebkitAppearance:"none",
                verticalAlign:"middle",
              }}
              placeholder={item}
              name={index}
              onChange={(e)=>setchecked(!checked)}
              value={checked}
            />
            <label name={index} style={{
                fontSize:"20px",
                fontStyle:"oblique",
                if (checked) {
                    this.fontSize="10px"
                    this.fontStyle="normal";
                }
            }}>{item}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Canvas;
