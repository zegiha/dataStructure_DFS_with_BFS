import React, {SetStateAction} from "react";
import {getVisit, movePlayer} from "./init";

class DFS {
  async move(setPlayer: React.Dispatch<SetStateAction<{ y: number, x: number }>>) {
    let stack = [{y: 1, x: 1}];
    let visit = getVisit();
    visit[1][1] = true


    while(stack.length > 0) {
      const coordinate = stack.pop();
      if(coordinate !== undefined) {
        const {y, x} = coordinate;

        setPlayer({y, x});
        if(x === 7 && y === 7) break;

        await new Promise(resolve => setTimeout(resolve, 200));

        const tmp = movePlayer(visit, y, x)
        const moves = tmp.res
        visit = tmp.visit
        for (let i = 0; i < moves.length; i++) stack.push(moves[i]);
      }
    }

    return;
  }
}

export default DFS
