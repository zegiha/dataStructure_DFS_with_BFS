import React, {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import playStatusAtom from "../atom/playStatusAtom";

export default function RenderButton() {
  const [style, setStyle] = useState("")
  const [contents, setContents] = useState("")
  const [playStatus, setPlayStatus] = useRecoilState(playStatusAtom)

  function playStatusHandler() {
    switch (playStatus) {
      case "idle":
        setPlayStatus("progress")
        break
      case "end":
        setPlayStatus("reset")
        break
    }
  }

  useEffect(() => {
    switch (playStatus) {
      case "idle":
        setStyle("startButton")
        setContents("시작하기")
        break
      case "progress":
        setStyle("progressButton")
        setContents("진행 중 입니다")
        break
      case "end":
        setStyle("restartButton")
        setContents("리셋하기")
        break
    }
  }, [playStatus]);

  return <div className={style} onClick={() => playStatusHandler()}>{contents}</div>
}
