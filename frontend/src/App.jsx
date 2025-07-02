import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feedback from "./pages/Feedback";
import WordCloudPage from "./pages/WordCloudPage";
import AdminPage from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feedback />} />
        <Route path="/cloud" element={<WordCloudPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
