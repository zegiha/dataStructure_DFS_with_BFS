const originMap = [
  [-1],
  [-1, 8, 1, 0, 0, 0, 0, 0],
  [-1, 0, 1, 0, 1, 1, 1, 0],
  [-1, 0, 1, 1, 1, 0, 1, 0],
  [-1, 0, 0, 0, 1, 0, 1, 0],
  [-1, 0, 1, 1, 1, 1, 1, 0],
  [-1, 0, 0, 0, 0, 0, 1, 0],
  [-1, 0, 0, 0, 0, 0, 1, 9],
  // [-1],
  // [-1, 8, 1, 1, 1, 1, 1, 1],
  // [-1, 1, 0, 1, 0, 1, 0, 1],
  // [-1, 1, 0, 1, 0, 1, 0, 1],
  // [-1, 1, 0, 1, 0, 1, 0, 1],
  // [-1, 1, 0, 1, 0, 1, 0, 1],
  // [-1, 1, 0, 1, 0, 1, 0, 1],
  // [-1, 1, 0, 1, 0, 1, 0, 9],
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
function isArea(n: number) {
  return !(n < 1 || n > 7);
}

export {
  originMap,
  getVisit,
  movePlayer,
}
