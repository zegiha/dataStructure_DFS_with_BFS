let originMap = [
  [8, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 0, 9],
]
function isNumeric(value: string) {
  return /^[0-9]+$/.test(value);
}
function parse2DArrayFromString(input: string) {
  let parseArr: number[][] = [];
  const arr = input.split('\n')

  for(let i = 1; i < arr.length - 1; i++) {
    let newN = '';
    let newArr: number[] = [];
    for(let j = 0; j < arr[i].length; j++) {
      if(isNumeric(arr[i][j])) {
        newN += arr[i][j];
      } else if(newN !== '') {
        newArr.push(Number(newN));
        newN = '';
      }
    }
    parseArr.push(newArr)
  }

  return parseArr;
}

function setOriginMap(newOrigin: string) {
  const parseNewOrigin = parse2DArrayFromString(newOrigin)
  originMap = [...parseNewOrigin];

}

function getVisit(n: number, m: number) {
  let res = []

  for(let i = 0; i < n; i++) {
    let tmp = []
    for(let j = 0; j < m; j++) tmp.push(false);
    res.push(tmp)
  }

  return res;
}

function movePlayer(visit: boolean[][], y: number, x: number) {
  const plus = [1, -1]
  let moves = []

  const n = visit.length, m = visit[0].length

  for(let i = 0; i < 2; i++) {
    if(isArea(x + plus[i], m)) if(originMap[y][x + plus[i]] !== 0 && !visit[y][x + plus[i]]) {
      moves.push({y, x: x + plus[i]})
      visit[y][x + plus[i]] = true
    }
    if(isArea(y + plus[i], n)) if(originMap[y + plus[i]][x] !== 0 && !visit[y + plus[i]][x]) {
      moves.push({y: y + plus[i], x})
      visit[y + plus[i]][x] = true
    }
  }

  return {moves, visit}
}
function isArea(n: number, end: number) {
  return !(n <= -1 || n >= end);
}

interface mapStateInterface {
  map: number[][],
  player: {
    y: number,
    x: number,
  },
}

function getPlayer(map: number[][]): {y: number, x: number} {
  let playerCdn = {x: -1, y: -1}

  for(let i = 0; i < map.length; i++) {
    for(let j = 0; j < map[i].length; j++) {
      if(map[i][j] === 8) {
        playerCdn = {y: i, x: j};
        break;
      }
      if(playerCdn.x !== -1 && playerCdn.y !== -1 ) break;
    }
  }

  return playerCdn
}

export {
  setOriginMap,
  originMap,
  getVisit,
  movePlayer,
  getPlayer
}
export type {mapStateInterface}
