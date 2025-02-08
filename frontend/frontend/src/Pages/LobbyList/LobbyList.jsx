import "./LobbyList.css";
import { useState, useEffect } from "react";
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
          <li key={lobby.id}>
            <a href={`/lobby/${lobby.id}`}>{i}</a>
          </li>
        ))}
      </ul>
      <button className="button-19" onClick={createLobby}>
        Create Lobby
      </button>
    </div>
  );
}
