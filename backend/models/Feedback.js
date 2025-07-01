const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, default: "익명" },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
