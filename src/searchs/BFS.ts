import {SetStateAction} from "react";
import {getVisit, movePlayer} from "./init";

class BFS {
  async move(setPlayer: React.Dispatch<SetStateAction<{y: number, x: number}>>) {
    let queue = [{y: 1, x: 1}]
    let visit = getVisit()
    let depth = -1;
    let found = false;
    visit[1][1] = true

    while(queue.length > 0 && !found) {
      const size = queue.length;
      for(let i = 0; i < size; i++) {
        const coordinate = queue.shift();
        if(coordinate !== undefined) {
          const {y, x} = coordinate;

          setPlayer({y, x});
          if(x === 7 && y === 7) {
            found = true;
            break;
          }

          await new Promise(resolve => setTimeout(resolve, 200));

          const tmp = movePlayer(visit, y, x)
          const moves = tmp.res
          visit = tmp.visit
          visit[1][1] = true
          for (let i = 0; i < moves.length; i++) queue.push(moves[i]);
        }
      }
      depth++;
    }
    return depth;
  }
}

export default BFS
