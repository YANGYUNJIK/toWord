// import { useState } from "react";
// import axios from "axios";
// import { API_URL } from "../api";

// function Feedback() {
//   const [name, setName] = useState("");
//   const [comment, setComment] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (comment.trim() === "") {
//       alert("소감은 필수입니다!");
//       return;
//     }

//     try {
//       await axios.post(API_URL, {
//         name: name.trim() === "" ? "익명" : name,
//         comment: comment.trim(),
//       });
//       alert("소감이 제출되었습니다!");
//       setName("");
//       setComment("");
//     } catch (error) {
//       console.error(error);
//       alert("제출 실패");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
//       <h1 style={{ textAlign: "center" }}>소감 작성</h1>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "20px" }}>
//           <label>이름 (선택)</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="이름을 입력하세요"
//             style={{
//               width: "100%",
//               padding: "12px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//               marginTop: "8px",
//             }}
//           />
//         </div>
//         <div style={{ marginBottom: "20px" }}>
//           <label>소감 (필수)</label>
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="소감을 입력하세요"
//             rows="4"
//             style={{
//               width: "100%",
//               padding: "12px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//               marginTop: "8px",
//             }}
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "14px",
//             backgroundColor: "#4D96FF",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//           }}
//         >
//           제출하기
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Feedback;

import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

function Feedback() {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, {
        name: "익명",
        comment: comment,
      });

      alert("제출 완료");
      setComment("");
    } catch (error) {
      console.error(error);
      alert("제출 실패");
    }
  };

  return (
    <div>
      <h1>소감 작성</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="소감을 입력하세요"
        />
        <br />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default Feedback;
