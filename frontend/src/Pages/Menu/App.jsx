import "./App.css";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const skibidiah = () => {
    localStorage.username = document.getElementById("name-box").value;
    navigate("/lobby");
  }

  return (
    <>
      <div id='homepage-title'>
        <motion.h1 animate={{ rotate: 360 }}>It Takes Two to Tango!</motion.h1>
      </div>
      <div id="buttons">
        <input id="name-box" className="name-box" placeholder="Choose a name..." type="text"></input>
        <div onClick={skibidiah}>
          <motion.button whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.8 }}
          className="home-button">
            Play
          </motion.button>
        </div>
        <div>
          <button id="home-button-tutorial" onClick={() => {navigate("/tutorial")}}>
            Tutorial
          </button>
          
        </div>
      </div>
    </>
  );
}

export default App;
