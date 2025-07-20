const express = require("express");
const redis = require("redis");
const app = express();
const cors = require("cors");

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
  },
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

// ✅ Connect once when the app starts
client.connect().then(() => {
  console.log("Connected to Redis server");
});

app.use(express.json()).use(cors());

console.log(process.env.PORT);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await client.lRange("tasks", 0, -1);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

app.post("/tasks", async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }
  try {
    let index = await client.lLen("tasks");
    var taskObject = {
      task: task,
      completed: false,
      id: index,
    };
    await client.rPush("tasks", JSON.stringify(taskObject));
    res.status(201).json({ message: "Task added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding task" });
  }
});

app.patch("/tasks", async (req, res) => {
  console.log(JSON.stringify(req.body));
  const { task } = req.body;
  const { id } = req.body;
  const { completed } = req.body;
  console.log(id, task, completed);
  if (!id) {
    return res.status(500).json({ error: "id not found" });
  }
  try {
    var taskObject = {
      task: task,
      completed: completed,
      id: id,
    };

    await client.lSet("tasks", id, JSON.stringify(taskObject));
    res.status(203).json({ message: "task updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
});
