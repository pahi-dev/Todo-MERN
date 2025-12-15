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
  title: { required: true, type: String },
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
app.get("/todos", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    console.log("Error fetching todos:", error);
    res.status(500).json({ message: "Error fetching todos" });
  }

  res.json(todos);
});

//Update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Error updating todo" });
  }
});


//Delete tod o
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await TodoModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Error deleting todo" });
  }
})

// Start the server and listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
// server.js A simple Express server that responds with "Hello World!" on the root route
