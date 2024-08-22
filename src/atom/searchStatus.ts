import {atom} from "recoil";

const searchStatusAtom = atom({
  key: 'searchStatus',
  default: {
    dfs: true,
    bfs: true,
  }
})

export default searchStatusAtom
