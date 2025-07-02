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
    origin: "*", // 🔥 개발 시 모든 origin 허용
    methods: ["GET", "POST", "DELETE"],
  },
});

// Socket.io 연결
io.on("connection", (socket) => {
  console.log("🟢 클라이언트 소켓 연결됨:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 클라이언트 연결 해제:", socket.id);
  });
});

// io 객체를 라우터에서 쓸 수 있도록 app에 저장
app.set("io", io);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/feedback", feedbackRouter);

// Health Check
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// MongoDB 연결
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

// 서버 실행
const PORT = process.env.PORT || 5000; // ✅ 반드시 이렇게!

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
