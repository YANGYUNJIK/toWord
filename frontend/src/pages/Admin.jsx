import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("admin-auth") === "true"
  );
  const [feedbacks, setFeedbacks] = useState([]);

  const correctPassword = "1234";

  const handleLogin = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
      localStorage.setItem("admin-auth", "true");
      fetchFeedbacks();
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    setAuthenticated(false);
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API_URL);
      setFeedbacks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFeedbacks();
    } catch (error) {
      console.error(error);
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
      <button onClick={handleLogout} style={{ float: "right" }}>
        로그아웃
      </button>
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
              borderRadius: "5px",
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
