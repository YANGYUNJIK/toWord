import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

function Feedback() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") {
      alert("소감은 필수입니다!");
      return;
    }

    try {
      await axios.post(API_URL, {
        name: name.trim() === "" ? "익명" : name,
        comment: comment.trim(),
      });

      alert("소감이 제출되었습니다!");
      setName("");
      setComment("");
    } catch (error) {
      console.error(error);
      alert("제출 실패");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>소감 작성</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px" }}>
              이름 (선택)
            </label>
            <input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "6px" }}>
              소감 (필수)
            </label>
            <textarea
              placeholder="소감을 입력하세요"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="5"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                fontSize: "16px",
                resize: "none",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            제출하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
