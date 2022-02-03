import React from "react";

const ButtonLeft = (props) => {
  return (
    <button
      onClick={props.handleLeftClick}
      disabled={props.isTimeRunning ? props.btnState : !props.btnState}
    >
      {props.buttonTxt}
    </button>
  );
};

export default ButtonLeft;
