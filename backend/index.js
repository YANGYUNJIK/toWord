const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const feedbackRouter = require("./routes/feedback");

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Render에서는 반드시 이거!

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/feedback", feedbackRouter);

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at port ${PORT}`);
});
