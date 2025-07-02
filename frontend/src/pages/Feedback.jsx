import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api";

function Feedback() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // 화면 크기 감지해서 모바일인지 여부 판단
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      console.error("제출 에러:", error);
      alert("제출에 실패했습니다.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: isMobile ? "flex-start" : "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
        padding: "20px",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "32px",
          }}
        >
          소감 작성
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
              }}
            >
              이름 (선택)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px", textAlign: "left" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "500",
              }}
            >
              소감 (필수)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              placeholder="소감을 입력하세요"
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                boxSizing: "border-box",
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
            }}
          >
            제출
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
