import "./LobbyList.css";
import { useState, useEffect } from "react";
import NewLobbyService from "../../../Services/NewLobbyService";

export default function LobbyList() {
  const [lobbies, setLobbies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/lobbies")
      .then((res) => res.json())
      .then((data) => setLobbies(data));
  }, []);

  return (
    <div>
      <h1>Lobbies</h1>
      <ul>
        {lobbies.map((lobby) => (
          <li key={lobby.id}>
            <a href={`/lobby/${lobby.id}`}>{lobby.name}</a>
          </li>
        ))}
      </ul>
      <button className="button-19" onClick={NewLobbyService.createLobby}>
        Create Lobby
      </button>
    </div>
  );
}
