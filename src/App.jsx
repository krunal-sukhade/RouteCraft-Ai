import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AiSuggestions from "./components/AiSuggestions";
import Chat from "./components/Chat";
import Trips from "./components/Trips";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/ai" element={<AiSuggestions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
