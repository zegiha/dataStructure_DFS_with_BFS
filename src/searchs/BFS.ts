import {SetStateAction} from "react";
import {getVisit, movePlayer} from "./init";

class BFS {
  async move(setPlayer: React.Dispatch<SetStateAction<{y: number, x: number}>>) {
    let queue = [{y: 1, x: 1}]
    let visit = getVisit()
    visit[1][1] = true

    while(queue.length > 0) {
      const coordinate = queue.shift();
      if(coordinate !== undefined) {
        const {y, x} = coordinate;

        setPlayer({y, x});
        if(x === 7 && y === 7) break;

        await new Promise(resolve => setTimeout(resolve, 1000));

        const tmp = movePlayer(visit, y, x)
        const moves = tmp.res
        visit = tmp.visit
        console.log(visit)
        visit[1][1] = true
        for (let i = 0; i < moves.length; i++) queue.push(moves[i]);
      }
    }
    return;
  }
}

export default BFS
