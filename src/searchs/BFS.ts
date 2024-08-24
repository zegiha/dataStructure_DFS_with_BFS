import React, {SetStateAction} from "react";
import {getVisit, mapStateInterface, movePlayer} from "./init";

class BFS {
  async move(mapState: mapStateInterface, setMapState: React.Dispatch<SetStateAction<mapStateInterface>>) {
    let queue = [{...mapState.player}]
    let visit = getVisit(mapState.map.length, mapState.map[0].length)
    let newMap = mapState.map.map((v: number[]) => [...v]);
    newMap[queue[0].y][queue[0].x] = 3;
    visit[queue[0].y][queue[0].x] = true;
    let depth = 0;
    let sw = true;

    while(queue.length > 0 && sw) {
      let size = queue.length;
      while(size--) {
        const coordinate = queue.shift();
        if(coordinate !== undefined) {
          setMapState(prevState => ({...prevState, player: coordinate}))

          if(mapState.map[coordinate.y][coordinate.x] === 9) {
            sw = false;
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
          for (let i = 0; i < moves.length; i++) queue.push(moves[i]);
        }
      }
      depth++;
    }

    return depth;
  }
}

export default BFS;

// import {SetStateAction} from "react";
// import {getVisit, movePlayer} from "./init";
//
// class BFS {
//   async move(setPlayer: React.Dispatch<SetStateAction<{y: number, x: number}>>) {
//     let queue = [{y: 1, x: 1}]
//     let visit = getVisit()
//     let depth = -1;
//     let found = false;
//     visit[1][1] = true
//
//     while(queue.length > 0 && !found) {
//       const size = queue.length;
//       for(let i = 0; i < size; i++) {
//         const coordinate = queue.shift();
//         if(coordinate !== undefined) {
//           const {y, x} = coordinate;
//
//           setPlayer({y, x});
//           if(x === 7 && y === 7) {
//             found = true;
//             break;
//           }
//
//           await new Promise(resolve => setTimeout(resolve, 200));
//
//           const tmp = movePlayer(visit, y, x)
//           const moves = tmp.res
//           visit = tmp.visit
//           visit[1][1] = true
//           for (let i = 0; i < moves.length; i++) queue.push(moves[i]);
//         }
//       }
//       depth++;
//     }
//     return depth;
//   }
// }
//
// export default BFS
