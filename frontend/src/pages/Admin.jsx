import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { API_URL, SOCKET_URL } from "../api";

const socket = io(SOCKET_URL);
const PASSWORD_KEY = "admin_authenticated";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem(PASSWORD_KEY) === "true"
  );
  const [feedbacks, setFeedbacks] = useState([]);

  const correctPassword = "1234";

  const fetchFeedbacks = async () => {
    const res = await axios.get(API_URL);
    setFeedbacks(res.data);
  };

  const handleLogin = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
      localStorage.setItem(PASSWORD_KEY, "true");
      fetchFeedbacks();
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem(PASSWORD_KEY);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    await axios.delete(`${API_URL}/${id}`);
    fetchFeedbacks();
  };

  useEffect(() => {
    if (authenticated) {
      fetchFeedbacks();
      socket.on("newFeedback", fetchFeedbacks);
      socket.on("deleteFeedback", fetchFeedbacks);

      return () => {
        socket.off("newFeedback", fetchFeedbacks);
        socket.off("deleteFeedback", fetchFeedbacks);
      };
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f9fafb",
          fontFamily: "Pretendard, sans-serif",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            관리자 로그인
          </h2>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              marginBottom: "10px",
            }}
          />
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "black")}
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "20px",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ marginBottom: "20px" }}>소감 목록 (관리자)</h1>
        <button
          onClick={handleLogout}
          style={{
            height: "40px",
            padding: "0 20px",
            backgroundColor: "#eee",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {feedbacks.map((item) => (
          <div
            key={item._id}
            style={{
              background: "white",
              padding: "16px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
            }}
          >
            <div>{item.comment}</div>
            <button
              onClick={() => handleDelete(item._id)}
              style={{
                padding: "6px 12px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
