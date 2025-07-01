const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// POST - 소감 저장
router.post("/", async (req, res) => {
  try {
    const { name, comment } = req.body;
    const feedback = new Feedback({ name, comment });
    await feedback.save();
    res.status(201).json({ message: "Feedback saved" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - 전체 소감 조회
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - 소감 삭제
router.delete("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
