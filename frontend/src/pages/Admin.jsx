import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback");
      setFeedbacks(res.data);
    } catch (error) {
      console.error("데이터 불러오기 실패", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:5000/api/feedback/${id}`);
        setFeedbacks(feedbacks.filter((item) => item._id !== id));
      } catch (error) {
        console.error("삭제 실패", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h1>관리자 페이지</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>이름</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>소감</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              작성일
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>삭제</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((item) => (
            <tr key={item._id}>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.name}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {item.comment}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {new Date(item.createdAt).toLocaleString()}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                <button
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(item._id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
