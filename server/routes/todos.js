import express from "express";
import Todo from "../models/Todo.js";
import protect from "../middleware/auth.js";

const router = express.Router();
router.use(protect);

// GET all my todos
router.get("/", async (req, res) => {
  const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(todos);
});

// ADD a todo
router.post("/", async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: "Title required" });
  }
  const todo = await Todo.create({ title: req.body.title, user: req.userId });
  res.status(201).json(todo);
});

// UPDATE a todo
router.put("/:id", async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json(todo);
});

// DELETE a todo
router.delete("/:id", async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!todo) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

export default router;