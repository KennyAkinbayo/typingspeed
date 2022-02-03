import React from "react";

const ButtonRight = (props) => {
  return (
    <button onClick={props.startGame} disabled={props.startBtn}>
      {props.buttonTxt}
    </button>
  );
};

export default ButtonRight;
