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
  const [completeModal, setCompleteModal] = useState(false)

  useEffect(() => {
    if(playStatus === "progress") {
      if(search instanceof DFS) {
      setSearchStatus((prevState) => ({...prevState, dfs: "progress"}))
      }
      else {
        setSearchStatus((prevState) => ({...prevState, bfs: "progress"}))
      }
      search.move(setPlayer).then(() => {
        setPlayer({y: 7, x: 7})
        setCompleteModal(true)
        if(search instanceof DFS) {
          setSearchStatus((prevState) => ({...prevState, dfs: "end"}))
        }
        else {
          setSearchStatus((prevState) => ({...prevState, bfs: "end"}))
        }
      });
    } else if(playStatus === "reset") {
      setPlayer({y: 1, x: 1})
      setCompleteModal(false)
      setPlayStatus("idle")
    }
  }, [playStatus]);
  useEffect(() => {
    if(searchStatus.dfs === "end" && searchStatus.bfs === "end") {
      setSearchStatus({dfs: "idle", bfs: "idle"})
      setPlayStatus("end")
    }
  }, [searchStatus]);

  return (
    <div className="simulation">
      {renderMap(player)}
      {completeModal && <div className="done">완료</div>}
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
