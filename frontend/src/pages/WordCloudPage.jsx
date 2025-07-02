import { useEffect, useState } from "react";
import axios from "axios";
import WordCloud from "react-wordcloud";
import { io } from "socket.io-client";
import { API_URL, SOCKET_URL } from "../api";

const socket = io(SOCKET_URL);

// 시간 변환 함수
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
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      {/* 타이틀 */}
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        경북소프트웨어 마이스터고 부스 체험
      </h1>
      <h3
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "20px",
          fontWeight: "normal",
        }}
      >
        지금까지 <strong>{feedbacks.length}</strong>명이 소감을 작성했습니다.
      </h3>

      {/* 메인 레이아웃 */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "100%",
          maxWidth: "1400px", // 🔥 화면 꽉 차게
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
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
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
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            overflowY: "auto",
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
                  borderBottom: "1px solid #eee",
                  padding: "8px 0",
                }}
              >
                {item.comment}
                <div
                  style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}
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
