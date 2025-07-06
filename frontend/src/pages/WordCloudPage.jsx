import { useEffect, useState } from "react";
import axios from "axios";
import WordCloud from "react-wordcloud";
import { io } from "socket.io-client";
import { API_URL, SOCKET_URL } from "../api";

const socket = io(SOCKET_URL);

const timeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
};

function WordCloudPage() {
  const [words, setWords] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const fetchData = async () => {
    const [wordsRes, feedbacksRes] = await Promise.all([
      axios.get(`${API_URL}/words`),
      axios.get(API_URL),
    ]);
    setWords(wordsRes.data);
    setFeedbacks(feedbacksRes.data);
  };

  useEffect(() => {
    fetchData();
    socket.on("newFeedback", fetchData);
    socket.on("deleteFeedback", fetchData);

    return () => {
      socket.off("newFeedback", fetchData);
      socket.off("deleteFeedback", fetchData);
    };
  }, []);

  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [20, 70],
    colors: darkMode
      ? ["#90caf9", "#f48fb1", "#ce93d8", "#80cbc4", "#ffd54f"]
      : ["#1976d2", "#d81b60", "#8e24aa", "#00897b", "#f9a825"],
  };

  const backgroundColor = darkMode ? "#121212" : "#f9fafb";
  const cardColor = darkMode ? "#1e1e1e" : "white";
  const textColor = darkMode ? "#eeeeee" : "#111";
  const subTextColor = darkMode ? "#aaaaaa" : "#666";
  const borderColor = darkMode ? "#333" : "#eee";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: backgroundColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Pretendard, sans-serif",
        color: textColor,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
            textAlign: "center",
            fontWeight: "700",
            width: "100%", // ✅ 이 줄만 추가하면 중앙 정렬됩니다
          }}
        >
          경북소프트웨어마이스터고 부스 체험
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "8px 16px",
            backgroundColor: darkMode ? "#333" : "#eee",
            color: darkMode ? "#fff" : "#111",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s",
            whiteSpace: "nowrap"
          }}
        >
          {darkMode ? "☀️ 라이트 모드" : "🌙 다크 모드"}
        </button>
      </div>

      <h3
        style={{
          textAlign: "center",
          color: subTextColor,
          marginBottom: "20px",
          fontWeight: "normal",
        }}
      >
        지금까지 <strong>{feedbacks.length}</strong>명이 소감을 작성했습니다.
      </h3>

      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          maxWidth: "1400px",
          justifyContent: "center",
          alignItems: "stretch",
          flexWrap: "wrap",
        }}
      >
        {/* 워드클라우드 */}
        <div
          style={{
            flex: "1 1 60%",
            minWidth: "500px",
            backgroundColor: cardColor,
            borderRadius: "16px",
            padding: "20px",
            boxShadow: darkMode
              ? "0 10px 20px rgba(255,255,255,0.05)"
              : "0 10px 20px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = darkMode
              ? "0 15px 25px rgba(255,255,255,0.08)"
              : "0 15px 25px rgba(0,0,0,0.15)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = darkMode
              ? "0 10px 20px rgba(255,255,255,0.05)"
              : "0 10px 20px rgba(0,0,0,0.1)";
          }}
        >
          <WordCloud words={words} options={options} />
        </div>

        {/* 최근 소감 */}
        <div
          style={{
            flex: "1 1 30%",
            minWidth: "300px",
            maxHeight: "70vh",
            backgroundColor: cardColor,
            borderRadius: "16px",
            padding: "20px",
            boxShadow: darkMode
              ? "0 10px 20px rgba(255,255,255,0.05)"
              : "0 10px 20px rgba(0,0,0,0.1)",
            overflowY: "auto",
            transition: "all 0.3s ease",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>최근 소감</h3>
          {feedbacks.length === 0 ? (
            <p>아직 소감이 없습니다.</p>
          ) : (
            feedbacks.map((item) => (
              <div
                key={item._id}
                style={{
                  borderBottom: `1px solid ${borderColor}`,
                  padding: "8px 0",
                }}
              >
                {item.comment}
                <div
                  style={{
                    fontSize: "12px",
                    color: subTextColor,
                    marginTop: "4px",
                  }}
                >
                  {timeAgo(item.createdAt)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default WordCloudPage;
