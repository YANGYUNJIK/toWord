const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const feedbackRouter = require("./routes/feedback");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  },
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 io 객체를 라우터로 전달
app.use("/api/feedback", feedbackRouter(io));

app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// ✅ 소켓 연결 확인용 로그
io.on("connection", (socket) => {
  console.log("📡 A user connected:", socket.id);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected to DB");
});

server.listen(PORT, () => {
  console.log(`✅ Server is running at port ${PORT}`);
});
