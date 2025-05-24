import "./Game.css";
import { useState } from "react";
import Board from "../../Components/Board/Board";
import OtherBoard from "../../Components/OtherBoard/OtherBoard";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import useWebSocket from "react-use-websocket";
import WaitingForGame from "../../Components/WaitingForGame/WaitingForGame";

export default function Game() {
  const { id } = useParams();
  console.log(id);

  const [gameStarted, setGameStarted] = useState(false);
  const [name, setName] = useState([]);
  const [gamedata, setGamedata] = useState({});
  const [otherBoardState, setOtherBoardState] = useState([]);
  const [countingDown, setCountingDown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3);
  const [gameEnding, setGameEnding] = useState("");
  const [lockedSpaces, setLockedSpaces] = useState({});
  const navigate = useNavigate();

  const { sendJsonMessage } = useWebSocket(
    `${import.meta.env.VITE_WEBSOCKET_BASE}/play/${id}?name=${
      localStorage.username ?? "anonymous"
    }`,
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
            case "player_disconnected":
              // If the game is in progress, we need to leave the game
              if (gameStarted) {
                alert("Your opponent has disconnected from the game");
                setGameEnding("win");
              }
              break;
            case "game_start":
              setGameStarted(true);
              console.log(JSON.stringify(data));
              setGamedata(data.data);
              setLockedSpaces(data.data.lockedSpaces);
              setCountingDown(true);
              setTimeout(() => setTimeLeft(2), 1000);
              setTimeout(() => setTimeLeft(1), 2000);
              setTimeout(() => setTimeLeft(0), 3000);
              setTimeout(() => setCountingDown(false), 4000);
              break;
            case "game_state":
              console.log(data.data.spaces);
              console.log(data.data.theirBoard);
              setGamedata({
                spaces: data.data.spaces,
                modifiers: gamedata.modifiers,
                theirBoard: data.data.theirBoard,
              });
              console.log(gamedata);
              setOtherBoardState(data.data.theirBoard);
              break;
            case "win":
              setGameEnding("win");
              alert("You win!");
              break;
            case "lose":
              setGameEnding("lose");
              alert("You lose!");
              break;
          }
        } catch (e) {
          console.error("Something went wrong during the game");
          console.error(e);
          if (gameEnding === "") {
            navigate("/lobby");
          }
        }
      },
      onError: (error) => {
        if (gameEnding === "") {
          console.log(`Socket error: ${error}`);
          navigate("/lobby");
        }
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
  if (countingDown) {
    return <h1>{timeLeft}</h1>;
  }
  if (gameEnding !== "") {
    // Game has ended
    return (
      <div id="game-outcome-container">
        <motion.h1 className="game-outcome" animate={{ rotate: 360 }}>
          You {gameEnding === "win" ? "Won" : "Lost"}!
        </motion.h1>
        <button
          id={
            "return-to-lobby-button-" + (gameEnding === "win" ? "won" : "lost")
          }
          onClick={navigate("/lobby")}
        >
          Back to Lobbies
        </button>
      </div>
    );
  }
  if (gameStarted) {
    return (
      <div>
        <h1>It Takes Two to Tango!</h1>
        <div id="games">
          <Board
            gamestate={gamedata}
            owner={true}
            moveCallBack={handleMoveCallback}
            lockedSpaces={lockedSpaces}
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
