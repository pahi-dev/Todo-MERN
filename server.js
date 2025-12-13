const express = require("express");
const mongoose = require("mongoose");

// Create an instance of an Express application
const app = express();
app.use(express.json()); //requst body json

//connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/todoapp")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

//creating schema
const todoSchema = new mongoose.Schema({
  title: {required: true, type: String},
  description: String,
});

//creating model
const TodoModel = mongoose.model("Todo", todoSchema);

// let todos = [];

app.post("/todos", async (req, res) => {
  const { title, description } = req.body;

  // const newTodo = {
  //   id: todos.length + 1,
  //   title,
  //   description,
  // };
  // todos.push(newTodo);
  // console.log(todos);
  try {
    const newTodo = new TodoModel({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);

  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "titele need" });
  }
});


//get todos
app.get("/todos", async(req, res) => {
try {
 const todos = await TodoModel.find();
 res.json(todos);
} catch (error) {
  console.log("Error fetching todos:", error)
  res.status(500).json({ message: "Error fetching todos" });
}

  res.json(todos);
});

// Start the server and listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
// server.js A simple Express server that responds with "Hello World!" on the root route
