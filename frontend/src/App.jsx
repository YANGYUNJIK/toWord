import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feedback from "./pages/Feedback";
import WordCloudPage from "./pages/WordCloudPage";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feedback />} />
        <Route path="/wordcloud" element={<WordCloudPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
