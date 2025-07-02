import { useState } from "react";
import axios from "axios";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const correctPassword = "1234"; // 🔥 여기에 원하는 비밀번호

  const handleLogin = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
      fetchFeedbacks();
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const fetchFeedbacks = async () => {
    const res = await axios.get("/api/feedback");
    setFeedbacks(res.data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/feedback/${id}`);
      fetchFeedbacks();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  if (!authenticated) {
    return (
      <div
        style={{ maxWidth: "400px", margin: "100px auto", textAlign: "center" }}
      >
        <h2>관리자 로그인</h2>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button onClick={handleLogin} style={{ padding: "10px 20px" }}>
          로그인
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h1>소감 목록 (관리자)</h1>
      {feedbacks.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <strong>{item.name}</strong>: {item.comment}
          <button
            onClick={() => handleDelete(item._id)}
            style={{
              marginLeft: "10px",
              padding: "4px 10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
