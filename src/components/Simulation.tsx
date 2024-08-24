import DFS from "../searchs/DFS";
import React, {Fragment, useEffect, useState} from "react";
import BFS from "../searchs/BFS";
import {getPlayer, mapStateInterface, originMap} from "../searchs/init";
import {useRecoilState} from "recoil";
import searchStatusAtom from "../atom/searchStatus";
import playStatusAtom from "../atom/playStatusAtom";

export default function Simulation({search}: {search: DFS | BFS}) {
  const [playStatus, setPlayStatus] = useRecoilState(playStatusAtom)
  const [searchStatus, setSearchStatus] = useRecoilState(searchStatusAtom)

  const [mapState, setMapState] =
    useState<mapStateInterface>({map: [...originMap], player: getPlayer([...originMap])})
  const [minDepth, setMinDepth] = useState<number | void | undefined>()
  const [completeModal, setCompleteModal] = useState(false)

  useEffect(() => {
    if(playStatus === "progress") {
      if (search instanceof DFS) {
        setSearchStatus(prev => ({...prev, dfs: "progress"}))
      } else {
        setSearchStatus(prev => ({...prev, bfs: "progress"}))
      }
      search.move(mapState, setMapState).then(res => {
        setCompleteModal(true);

        if (search instanceof DFS) {
          setSearchStatus(prev => ({...prev, dfs: "end"}))
        } else {
          setMinDepth(res)
          setSearchStatus(prev => ({...prev, bfs: "end"}))
        }
      })
    } else if(playStatus === "reset") {
      setCompleteModal(false);
      setMapState({map: [...originMap], player: getPlayer([...originMap])})
      setPlayStatus("idle")
    }
  }, [playStatus]);

  useEffect(() => {
    if(searchStatus.dfs === "end" && searchStatus.bfs === "end") {
      setPlayStatus("end")
      setSearchStatus({dfs: "idle", bfs: "idle"})
    }
  }, [searchStatus]);

  // console.log(`${search instanceof DFS ? "DFS: " : "BFS: "}`)
  // console.log(mapState.map)

  return (
    <div className="simulation">
      <RenderMap mapState={mapState}/>
      {completeModal && <div className="done">
        {minDepth === undefined ? "완료" : `최소 이동 횟수: ${minDepth}`}
      </div>}
    </div>
  );
}

function RenderMap({mapState}: {mapState: mapStateInterface}) {
  return (
    <Fragment>
      {
        mapState.map.map((row, i) => {
          return (
            <div key={i} className="row">
              {
                row.map((v, j) => {
                  let divClass = "cell";

                  if(mapState.player.y === i && mapState.player.x === j) divClass += " player"
                  else if(v === 9) divClass += " goal";
                  else if(v === 0) divClass += " wall"
                  else if(v === 3) divClass += " visit"

                  return <div key={`${i}, ${j}`} className={divClass} />
                })
              }
            </div>
          );
        })
      }
    </Fragment>
  );
}
