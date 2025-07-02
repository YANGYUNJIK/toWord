import React, { useEffect, useState } from "react";
import WordCloud from "react-wordcloud";

function WordCloudPage() {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/feedback");
        const comments = res.data.map((item) => item.comment).join(" ");

        const wordCounts = countWords(comments);

        const wordArray = Object.keys(wordCounts).map((word) => ({
          text: word,
          value: wordCounts[word],
        }));

        setWords(wordArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeedback();
  }, []);

  const options = {
    rotations: 0,
    fontSizes: [20, 100],
    fontFamily: "Pretendard, sans-serif",
    colors: ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#A66DD4"],
    enableTooltip: true,
    deterministic: false,
    scale: "sqrt",
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        margin: "0",
        padding: "0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          padding: "20px",
          margin: 0,
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          zIndex: 1,
        }}
      >
        소감 워드 클라우드
      </h1>
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "90%",
          }}
        >
          <WordCloud words={words} options={options} />
        </div>
      </div>
    </div>
  );
}

export default WordCloudPage;
