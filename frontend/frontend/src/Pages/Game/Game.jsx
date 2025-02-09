import "./Game.css";
import { useEffect, useState } from "react";
import Board from "../../Components/Board/Board";
import OtherBoard from "../../Components/OtherBoard/OtherBoard";
import gamedata from "./game.json";
import gamedata2 from "./game2.json";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket";
import WaitingForGame from "../../Components/WaitingForGame/WaitingForGame";

export default function Game() {
  const { id } = useParams();
  console.log(id);

  const [gameStarted, setGameStarted] = useState(false);
  const [name, setName] = useState([]);
  const [gamedata, setGamedata] = useState([]);
  const [otherBoardState, setOtherBoardState] = useState([]);

  const { sendJsonMessage, getWebSocket } = useWebSocket(
    "ws://localhost:8080/play/" + id,
    {
      onOpen: () => console.log("Connected to server"),
      onMessage: (event) => {
        try {
          const message = event.data;
          const data = JSON.parse(message);
          console.log(data);
          switch (data.command) {
            case "lobby_update":
              console.log(data.data.players);
              setName(data.data.players);
              break;
            case "game_start":
              setGameStarted(true);
              console.log(JSON.stringify(data));
              setGamedata(data);
              break;
            case "game_state":
              console.log(data.data.spaces);
              console.log(data.data.theirBoard);
              setOtherBoardState(data.data.theirBoard);
              break;
          }
        } catch (e) {
          console.error(e);
          window.location.href = "/lobby";
        }
      },
      onError: (event) => {
        console.log(event);
        window.location.href = "/lobby";
      },
    }
  );

  var handleMoveCallback = (data) => {
    sendJsonMessage(data);
  };

  const startOnClick = () => {
    sendJsonMessage({
      command: "start_game",
    }); // send start game command
  };

  const printBothBoards = () => {
    console.log(gamedata.data.board.symbols);
    console.log(gamedata2.data.board.symbols);
  };
  if (gameStarted) {
    return (
      <div>
        <h1>It Takes Two to Tango</h1>
        <div id="games">
          <Board
            gamestate={gamedata.data}
            owner={true}
            moveCallBack={handleMoveCallback}
          />
          <OtherBoard gamestate={otherBoardState} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <WaitingForGame players={name} />
        <div>
          <button className="button-19" onClick={startOnClick}>
            Start
          </button>
        </div>
      </div>
    );
  }
}
