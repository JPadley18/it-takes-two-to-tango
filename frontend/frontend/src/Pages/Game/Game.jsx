import "./Game.css";

import Board from "../../Components/Board/Board";
import gamedata from "./game.json";
import gamedata2 from "./game2.json";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";

export default function Game() {
  const { id } = useParams();
  console.log(id);

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
            case "update":
              gamedata.data.board.symbols = data.board.symbols;
              break;
            case "win":
              console.log("win");
              break;
            case "draw":
              console.log("draw");
              break;
            default:
              console.log("default");
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
}
