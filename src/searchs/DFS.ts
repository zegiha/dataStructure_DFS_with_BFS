import React, {SetStateAction} from "react";
import {getVisit, mapStateInterface, movePlayer} from "./init";

class DFS {
  async move(mapState: React.ComponentState, setMapState: React.Dispatch<SetStateAction<mapStateInterface>>) {
    let stack = [{...mapState.player}]
    let visit = getVisit(mapState.map.length, mapState.map[0].length)
    let newMap = mapState.map.map((v: number[]) => [...v]);
    newMap[stack[0].y][stack[0].x] = 3;
    visit[stack[0].y][stack[0].x] = true;

    while(stack.length > 0) {
      const coordinate = stack.pop();
      if(coordinate !== undefined) {
        setMapState(prevState => ({...prevState, player: coordinate}))

        if(mapState.map[coordinate.y][coordinate.x] === 9) {
          break;
        }
        if(mapState.map[coordinate.y][coordinate.x] === 1) {
          newMap[coordinate.y][coordinate.x] = 3;
          setMapState(prev => ({map: newMap, player: prev.player}))
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        const movePlayerData = movePlayer(visit, coordinate.y, coordinate.x)

        const moves = movePlayerData.moves;
        visit = movePlayerData.visit;
        for (let i = 0; i < moves.length; i++) stack.push(moves[i]);
      }
    }
    return;
  }
}

export default DFS;

// import React, {SetStateAction} from "react";
// import {getVisit, movePlayer} from "./init";
//
// class DFS {
//   async move(setPlayer: React.Dispatch<SetStateAction<{ y: number, x: number }>>) {
//     let stack = [{y: 1, x: 1}];
//     let visit = getVisit();
//     visit[1][1] = true
//
//
//     while(stack.length > 0) {
//       const coordinate = stack.pop();
//       if(coordinate !== undefined) {
//         const {y, x} = coordinate;
//
//         setPlayer({y, x});
//         if(x === 7 && y === 7) break;
//
//         await new Promise(resolve => setTimeout(resolve, 200));
//
//         const tmp = movePlayer(visit, y, x)
//         const moves = tmp.res
//         visit = tmp.visit
//         for (let i = 0; i < moves.length; i++) stack.push(moves[i]);
//       }
//     }
//
//     return;
//   }
// }
//
// export default DFS
