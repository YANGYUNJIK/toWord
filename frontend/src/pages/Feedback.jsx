import { useState } from "react";
import axios from "axios";

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
      const response = await axios.post("/api/feedback", {
        name,
        comment,
      });

      console.log(response.data);
      alert("소감이 제출되었습니다!");
      setName("");
      setComment("");
    } catch (error) {
      console.error("제출 에러:", error);
      alert("제출에 실패했습니다.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h1>소감 작성</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>이름 (선택)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>소감 (필수)</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            required
            style={{
              width: "100%",
              padding: "8px",
              marginTop: "5px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          제출
        </button>
      </form>
    </div>
  );
}

export default Feedback;
