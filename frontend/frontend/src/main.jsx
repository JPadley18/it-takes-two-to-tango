import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./Pages/Menu/App";
import Register from "./Pages/Register/Register";
import Game from "./Pages/Game/Game";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/game" element={<Game />} />
      </Routes>
    </Router>
  </StrictMode>
);
