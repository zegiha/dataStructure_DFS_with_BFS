import {atom} from "recoil";

const playStatusAtom = atom({
  key: 'playStatus',
  default: 'idle'
})

export default playStatusAtom
