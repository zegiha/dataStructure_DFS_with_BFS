import React, {Fragment, useState} from "react";
import {createPortal} from "react-dom";
import {setOriginMap} from "../searchs/init";
import {useRecoilState} from "recoil";
import playStatusAtom from "../atom/playStatusAtom";

function Modal() {
  const [_, setPlayStatus] = useRecoilState(playStatusAtom)

  const [modal, setModal] = useState(false)
  const [map, setMap] = useState('');
  const placeholder = "맵을 입력해주세요\n--예시--\n[\n  [0, 1],\n  [0, 1],\n]"

  const textAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMap(e.target.value)
  }
  const submitHandler = () => {
    setOriginMap(map)
    setPlayStatus("reset")
    setMap('')
    setModal(false)
  }


  return (
    <Fragment>
      <div className="modalOpenButton" onClick={() => setModal(true)}>
        맵 커스텀하기
      </div>
      {modal && createPortal(
        <div className="modalContainer">
          <textarea className="modalTextarea"
            placeholder={placeholder}
            onChange={textAreaHandler}
            value={map}
          />
          <div className="modalOnButtonContainer">
            <div className="modalCloseButton"
                 onClick={() => setModal(false)}
            >
              창 닫기
            </div>
            <div className="modalSubmitButton" onClick={() => submitHandler()}>
              확인
            </div>
          </div>
        </div>,
        document.body
      )}
    </Fragment>
  );
}

export default Modal
