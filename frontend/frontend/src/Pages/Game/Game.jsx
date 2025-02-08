import "./Game.css";
import { useEffect, useState } from "react";
import Board from "../../Components/Board/Board";
import gamedata from "./game.json";
import gamedata2 from "./game2.json";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import WaitingForGame from "../../Components/WaitingForGame/WaitingForGame";

export default function Game() {
  const { id } = useParams();
  console.log(id);

  const [gameStarted, setGameStarted] = useState(false);
  const [name, setName] = useState("");

  const { sendJsonMessage, getWebSocket } = useWebSocket(
    "ws://localhost:8080/play/" + id,
    {
      onOpen: () => console.log("Connected to server"),
      onMessage: (event) => {
        try {
          const message = event.data;
          const data = JSON.parse(message);
          console.log(data);
          switch (data.type) {
            case "lobby_update":
              console.log(data);
              setName(data);
              gamedata.data.board.symbols = data.board.symbols;
              break;
            case "game_start":
              setGameStarted(true);
              break;
          }
        } catch (e) {
          console.error(e);
        }
      },
    }
  );

  const printBothBoards = () => {
    console.log(gamedata.data.board.symbols);
    console.log(gamedata2.data.board.symbols);
  };
  if (gameStarted) {
    return (
      <div>
        <h1>Game</h1>
        <div id="games">
          <Board gamestate={gamedata} />
          <Board gamestate={gamedata2} />
        </div>
        <button className="button-19" onClick={printBothBoards}>
          Print Both Games
        </button>
      </div>
    );
  } else {
    return <WaitingForGame name={name} />;
  }
}
