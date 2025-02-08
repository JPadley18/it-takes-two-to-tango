import "./WaitingForGame.css";
import { useEffect, useState } from "react";
import propTypes from "prop-types";

export default function WaitingForGame(props) {
  return (
    <div>
      <h1>Welcome {props.name}</h1>
      <h2>Waiting for game to start</h2>
    </div>
  );
}
WaitingForGame.propTypes = {
  gamestate: propTypes.json,
};
