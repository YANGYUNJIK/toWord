import React, { useEffect, useState } from "react";
import WordCloud from "react-wordcloud";
import axios from "axios";

function WordCloudPage() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const res = await axios.get("/api/feedback/words");
        setWords(res.data);
      } catch (error) {
        console.error("❌ 워드클라우드 데이터 불러오기 실패:", error);
      }
    };

    fetchWords();
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
}

export default WordCloudPage;
