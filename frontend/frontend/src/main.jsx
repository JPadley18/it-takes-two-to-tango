import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./Pages/Menu/App";
import Register from "./Pages/Register/Register";
import Game from "./Pages/Game/Game";
import LobbyList from "./Pages/LobbyList/LobbyList";
import Leaderboard from "./Pages/Leaderboard/Leaderboard";
import Tutorial from "./Pages/Tutorial/tutorial";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/game" element={<Game />} />
        <Route exact path="/lobby" element={<LobbyList />} />
        <Route exact path="/lobby/:id" element={<Game />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
        <Route exact path="/tutorial" element={<Tutorial />} /> 
      </Routes>
    </Router>
  </StrictMode>
);
