import { useEffect, useState } from "react";
import axios from "axios";
import WordCloud from "react-wordcloud";
import { io } from "socket.io-client";
import { API_URL, SOCKET_URL } from "../api";

const socket = io(SOCKET_URL);

function WordCloudPage() {
  const [words, setWords] = useState([]);

  const fetchWords = async () => {
    const res = await axios.get(`${API_URL}/words`);
    setWords(res.data);
  };

  useEffect(() => {
    fetchWords();

    socket.on("newFeedback", fetchWords);
    socket.on("deleteFeedback", fetchWords);

    return () => {
      socket.off("newFeedback", fetchWords);
      socket.off("deleteFeedback", fetchWords);
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
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>소감 워드클라우드</h1>
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "70vh",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        }}
      >
        <WordCloud words={words} options={options} />
      </div>
    </div>
  );
}

export default WordCloudPage;
