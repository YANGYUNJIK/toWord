const express = require("express");
const Feedback = require("../models/Feedback");

module.exports = (io) => {
  const router = express.Router();

  // ✅ 소감 저장
  router.post("/", async (req, res) => {
    try {
      const { name, comment } = req.body;
      const feedback = new Feedback({ name, comment });
      await feedback.save();

      // ✅ 저장 후 워드클라우드 새로고침을 위한 소켓 이벤트 발생
      io.emit("newFeedback", { message: "New feedback added" });

      res.status(201).json({ message: "Feedback saved" });
    } catch (error) {
      console.error("❌ 저장 오류:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // ✅ 전체 소감 조회
  router.get("/", async (req, res) => {
    try {
      const feedbacks = await Feedback.find().sort({ createdAt: -1 });
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ✅ 삭제
  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Feedback.findByIdAndDelete(id);

      io.emit("deleteFeedback", { message: "Feedback deleted" });

      res.json({ message: "삭제 완료" });
    } catch (error) {
      console.error("❌ 삭제 오류:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // ✅ 워드클라우드용 데이터 반환
  router.get("/words", async (req, res) => {
    try {
      const feedbacks = await Feedback.find();
      const allComments = feedbacks.map((item) => item.comment).join(" ");

      const wordCounts = countWords(allComments);

      const wordArray = Object.keys(wordCounts).map((word) => ({
        text: word,
        value: wordCounts[word],
      }));

      res.json(wordArray);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 단어 카운트 함수
  function countWords(text) {
    const words = text
      .replace(/[^\w\sㄱ-ㅎ가-힣]/g, "")
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length >= 1);

    const counts = {};
    words.forEach((word) => {
      counts[word] = (counts[word] || 0) + 1;
    });

    return counts;
  }

  return router;
};
