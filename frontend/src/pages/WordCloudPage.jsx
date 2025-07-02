import { useEffect, useState } from "react";
import WordCloud from "react-wordcloud";
import axios from "axios";
import { io } from "socket.io-client";

function WordCloudPage() {
  const [words, setWords] = useState([]);

  const fetchWords = async () => {
    try {
      const res = await axios.get("/api/feedback/words");
      setWords(res.data);
    } catch (error) {
      console.error("워드클라우드 로딩 실패:", error);
    }
  };

  useEffect(() => {
    fetchWords();

    const socket = io("http://localhost:5000"); // 🔥 백엔드 소켓 연결

    socket.on("connect", () => {
      console.log("🟢 소켓 연결됨:", socket.id);
    });

    socket.on("update", () => {
      console.log("🆕 워드클라우드 데이터 갱신");
      fetchWords();
    });

    socket.on("disconnect", () => {
      console.log("🔴 소켓 연결 해제");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const options = {
    rotations: 0,
    fontSizes: [20, 100],
    fontFamily: "Pretendard, sans-serif",
    colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#A66DD4"],
    scale: "sqrt",
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 style={{ textAlign: "center", padding: "20px" }}>
        소감 워드 클라우드
      </h1>
      <div
        style={{
          width: "90%",
          height: "80%",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WordCloud words={words} options={options} />
      </div>
    </div>
  );
} //
export default WordCloudPage;
