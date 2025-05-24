import "./LobbyList.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import NewLobbyService from "../../../Services/NewLobbyService";

export default function LobbyList() {
  const [lobbies, setLobbies] = useState([]);
  const [response, setResponse] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://tango.sherv.co.uk:8080/lobbies")
      .then((res) => res.json())
      .then((data) => setLobbies(data.lobbies));
  }, [response]);

  const createLobby = async () => {
    const response = await NewLobbyService.createLobby();
    setResponse(response.id);
    navigate("/lobby/" + response.id);
  };

  return (
    <div>
      <h1>Lobbies</h1>
      <ul>
        {lobbies.map((lobby, i) => (
          <li className="lobby-listing" key={lobby.id}>
            <Link to={`/lobby/${lobby.id}`}>
              {lobby.title} - {lobby.playerCount} players
            </Link>
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.8 }}
        className="button-19 create-lobby-button"
        onClick={createLobby}
      >
        Create Lobby
      </motion.button>
    </div>
  );
}
