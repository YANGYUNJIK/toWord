import { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("admin-auth") === "true"
  );
  const [feedbacks, setFeedbacks] = useState([]);

  const correctPassword = "1234"; // 🔥 비밀번호

  const handleLogin = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
      localStorage.setItem("admin-auth", "true"); // ✅ 인증 상태 저장
      fetchFeedbacks();
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-auth"); // ✅ 인증 상태 제거
    setAuthenticated(false);
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("/api/feedback");
      setFeedbacks(res.data);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
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

  useEffect(() => {
    if (authenticated) {
      fetchFeedbacks();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div
        style={{
          maxWidth: "400px",
          margin: "100px auto",
          textAlign: "center",
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <h2>관리자 로그인</h2>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          로그인
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h1>소감 목록 (관리자)</h1>
      <button
        onClick={handleLogout}
        style={{
          padding: "6px 14px",
          backgroundColor: "gray",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          float: "right",
        }}
      >
        로그아웃
      </button>

      {feedbacks.length === 0 ? (
        <p>현재 소감이 없습니다.</p>
      ) : (
        feedbacks.map((item) => (
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
                borderRadius: "5px",
              }}
            >
              삭제
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPage;
