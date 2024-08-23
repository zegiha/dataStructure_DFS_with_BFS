import React from 'react';
import './App.css';
import DFS from "./searchs/DFS";
import RenderButton from "./components/RenderButton";
import Simulation from "./components/Simulation";
import BFS from "./searchs/BFS";

function App() {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          DFS with BFS
        </div>
        <div className="simulationContainer">
          <div className="simulationWrapper">
            <Simulation search={new DFS()} />
            <div className="simulationTitle">DFS</div>
          </div>
          <div className="simulationWrapper">
            <Simulation search={new BFS()} />
            <div className="simulationTitle">BFS</div>
          </div>
        </div>
        <div>
          <RenderButton />
        </div>
      </div>
    </div>
  );
}

export default App;
