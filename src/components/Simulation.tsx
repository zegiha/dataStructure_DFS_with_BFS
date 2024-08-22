import DFS from "../searchs/DFS";
import {useRecoilState} from "recoil";
import playStatusAtom from "../atom/playStatusAtom";
import React, {useEffect, useState} from "react";
import BFS from "../searchs/BFS";
import {originMap} from "../searchs/init";
import searchStatusAtom from "../atom/searchStatus";

export default function Simulation({search}: {search: DFS | BFS}) {
  const [searchStatus, setSearchStatus] = useRecoilState(searchStatusAtom)
  const [playStatus, setPlayStatus] = useRecoilState(playStatusAtom)
  const [player, setPlayer] = useState({x: 1, y: 1});

  useEffect(() => {
    console.log(playStatus)
    if(playStatus === "progress") {
      if(search instanceof DFS) setSearchStatus({dfs: false, bfs: searchStatus.bfs})
      else setSearchStatus({dfs: searchStatus.dfs, bfs: false})

      search.move(setPlayer).then(() => {
        setPlayer({y: 7, x: 7})
        if(search instanceof DFS) {
          setSearchStatus({dfs: true, bfs: searchStatus.bfs})
          console.log(searchStatus.bfs)
        }
        else setSearchStatus({dfs: searchStatus.dfs, bfs: true})

        if(searchStatus.bfs && searchStatus.dfs) {
          setPlayStatus("end")
        }
      });
    } else if(playStatus === "reset") {
      setPlayer({y: 1, x: 1})
      setPlayStatus("idle")
    }
  }, [playStatus]);

  return (
    <div className="simulation">
      {renderMap(player)}
    </div>
  );
}

function renderMap(player: {y: number, x: number}) {
  let row = []
  for(let i = 1; i <= 7; i++) {
    row.push(
      <div className={"row"}>{renderCell(i, player)}</div>
    )
  }
  return row
}
function renderCell(i: number, player: {y: number, x: number}) {
  let cell = []
  for(let j = 1; j <= 7; j++) {
    let style = "cell";

    if(originMap[i][j] === 0) style += " wall"
    if(i === player.y && j === player.x) style += " player"
    if(i === 7 && j === 7) style += " goal"


    cell.push(
      <div className={style}/>
    )
  }
  return cell
}
