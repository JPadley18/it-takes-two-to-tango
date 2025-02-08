import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>It Takes Two to Tango</h1>
      </div>
      <div id="buttons">
        <a href="/register">
          <button className="button-19" id="play">
            Play
          </button>
        </a>
        <a href="/leaderboard">
          <button className="button-19" id="leaderboard">
            Leaderboard
          </button>
        </a>
        
        <button className="button-19" id="tutorial">
          Tutorial
        </button>
      </div>
    </>
  );
}

export default App;
