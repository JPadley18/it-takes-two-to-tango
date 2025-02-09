import "./LobbyList.css";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import NewLobbyService from "../../../Services/NewLobbyService";

export default function LobbyList() {
  const [lobbies, setLobbies] = useState([]);
  const [response, setResponse] = useState("");
  useEffect(() => {
    fetch("http://localhost:8080/lobbies")
      .then((res) => res.json())
      .then((data) => setLobbies(data.lobbies));
  }, [response]);

  const createLobby = async () => {
    const response = await NewLobbyService.createLobby();
    setResponse(response.id);
  };

  return (
    <div>
      <h1>Lobbies</h1>
      <ul>
        {lobbies.map((lobby, i) => (
          <li className="lobby-listing" key={lobby.id}>
            <a href={`/lobby/${lobby.id}`}>{lobby.id} - {lobby.playerCount} players</a>
          </li>
        ))}
      </ul>
      <motion.button whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.8 }} className="button-19 create-lobby-button" onClick={createLobby}>
        Create Lobby
      </motion.button>
    </div>
  );
}
