import {atom} from "recoil";

const searchStatusAtom = atom({
  key: 'searchStatus',
  default: {
    dfs: "idle",
    bfs: "idle",
  }
})

export default searchStatusAtom
