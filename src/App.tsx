import React, {SetStateAction, useEffect, useState} from 'react';
import './App.css';

const originMap = [
  [-1],
  [-1, 8, 1, 0, 0, 0, 0, 0],
  [-1, 0, 1, 0, 1, 1, 1, 0],
  [-1, 0, 1, 1, 1, 0, 1, 0],
  [-1, 0, 0, 0, 1, 0, 1, 0],
  [-1, 0, 1, 1, 1, 1, 1, 0],
  [-1, 0, 0, 0, 0, 0, 1, 0],
  [-1, 0, 0, 0, 0, 0, 1, 9],
]

function getVisit() {
  let res = []

  for(let i = 0; i <= 7; i++) {
    let tmp = []
    for(let j = 0; j <= 7; j++) tmp.push(false);
    res.push(tmp)
  }

  return res;
}
function isArea(n: number) {
  return !(n < 1 || n > 7);
}
function movePlayer(visit: boolean[][], y: number, x: number) {
  const plus = [1, -1]
  let res = []

  for(let i = 0; i < 2; i++) {
    if(isArea(x + plus[i])) if(originMap[y][x + plus[i]] !== 0 && !visit[y][x + plus[i]]) {
      res.push({y, x: x + plus[i]})
      visit[y][x + plus[i]] = true
    }
    if(isArea(y + plus[i])) if(originMap[y + plus[i]][x] !== 0 && !visit[y + plus[i]][x]) {
      res.push({y: y + plus[i], x})
      visit[y + plus[i]][x] = true
    }
  }

  return {res, visit}
}

class DFS {
  async move(setPlayer: React.Dispatch<SetStateAction<{ y: number, x: number }>>) {
    let stack = [{y: 1, x: 1}];
    let visit = getVisit();

    while(stack.length > 0) {
      const coordinate = stack.pop();
      if(coordinate !== undefined) {
        const {y, x} = coordinate;

        setPlayer({y, x});
        if(x === 7 && y === 7) break;

        await new Promise(resolve => setTimeout(resolve, 1000));

        const tmp = movePlayer(visit, y, x)
        const moves = tmp.res
        visit = tmp.visit
        for (let i = 0; i < moves.length; i++) stack.push(moves[i]);
      }
    }

    return;
  }
}

function App() {
  const [progressStatus, setProgressStatus] = useState<boolean>(false);
  const [playStatus, setPlayStatus] = useState<"idle" | "progress" | "end">("idle");

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          DFS with BFS
        </div>
        <div className="simulationContainer">
          <div className="simulationWrapper">
            <Simulation
              search={new DFS()}
              progressStatus={progressStatus}
              setProgressStatus={setProgressStatus}
            />
            <div className="simulationTitle">DFS</div>
          </div>
          <div className="simulationWrapper">
            <Simulation
              search={new DFS()}
              progressStatus={progressStatus}
              setProgressStatus={setProgressStatus}
            />
            <div className="simulationTitle">BFS</div>
          </div>
        </div>
        <RenderButton
          playStatus={playStatus}
          setPlayStatus={setPlayStatus}
          setProgressStatus={setProgressStatus}
        />
      </div>
    </div>
  );
}

function RenderButton({playStatus, setPlayStatus, setProgressStatus}: {
  playStatus: "idle" | "progress" | "end";
  setPlayStatus: React.Dispatch<SetStateAction<"idle" | "progress" | "end">>
  setProgressStatus: React.Dispatch<SetStateAction<boolean>>
}) {
  function playStatusHandler() {
    switch (playStatus) {
      case "idle":
        setPlayStatus("progress")
        setProgressStatus(true)
        break
      case "end":
        setPlayStatus("idle")
        break
    }
  }

  let style, contents;
  switch (playStatus) {
    case "idle":
      style="startButton"
      contents="시작하기"
      break
    case "progress":
      style="progressButton"
      contents="진행 중 입니다"
      break
    case "end":
      style="restartButton"
      contents="리셋하기"
      break
  }
  return <div className={style} onClick={() => playStatusHandler()}>{contents}</div>
}

function Simulation({search, progressStatus, setProgressStatus}: {
  search: DFS;
  progressStatus: boolean;
  setProgressStatus: React.Dispatch<SetStateAction<boolean>>
}) {
  const [player, setPlayer] = useState({x: 1, y: 1});

  const renderMap = () => {
    let row = []
    for(let i = 1; i <= 7; i++) {
      row.push(
        <div className={"row"}>{renderCell(i)}</div>
      )
    }
    return row
  }
  const renderCell = (i: number) => {
    let cell = []
    for(let j = 1; j <= 7; j++) {
      const style = i === player.y && j === player.x ? "cell player" : "cell"
      cell.push(
        <div className={style}/>
      )
    }
    return cell
  }
  useEffect(() => {
    if(progressStatus) {
      search.move(setPlayer).then(() => {
        setProgressStatus(false)
        setPlayer({y: 7, x: 7})
      });
    }
  }, [progressStatus]);

  return (
    <div className="simulation">
      {renderMap()}
    </div>
  );
}

export default App;
