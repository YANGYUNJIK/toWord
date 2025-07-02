const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// ✅ 소감 저장
router.post("/", async (req, res) => {
  try {
    const { name, comment } = req.body;
    const feedback = new Feedback({
      name: name?.trim() === "" ? "익명" : name,
      comment: comment.trim(),
    });
    await feedback.save();
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
    console.error("❌ 조회 오류:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ 소감 삭제 → 반드시 words보다 위에 있어야 함
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Feedback.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "해당 항목을 찾을 수 없습니다." });
    }
    res.json({ message: "삭제 완료" });
  } catch (error) {
    console.error("❌ 삭제 오류:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ 워드 클라우드용 데이터 반환
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
    console.error("❌ 워드 클라우드 오류:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ 단어 카운트 함수
function countWords(text) {
  const words = text
    .replace(/[^\w\sㄱ-ㅎ가-힣]/g, "") // 특수문자 제거
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length >= 1);

  const counts = {};
  words.forEach((word) => {
    counts[word] = (counts[word] || 0) + 1;
  });

  return counts;
}

module.exports = router;
