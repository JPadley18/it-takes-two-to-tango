import "./WaitingForGame.css";
import { useEffect, useState } from "react";
import propTypes from "prop-types";

export default function WaitingForGame(props) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    setPlayers(props.players);
  }, [props.players]);
  return (
    <div>
      {/* {players.map((player, i) => (
        <h1 key={i}>Welcome {player}</h1>
      ))} */}
      <h2>Waiting for game to start</h2>
    </div>
  );
}
WaitingForGame.propTypes = {
  players: propTypes.array,
};
