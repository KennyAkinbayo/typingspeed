import React from "react";
import ButtonRight from "./ButtonRight";
import MyText from "./MyText";

const MyRightForm = (props) => {
  return (
    <div>
      <form>
        <h2>
          <MyText appText="Accuracy Game Checker!" />
        </h2>
        <h4>
          <MyText appText="How fast do you type with Accuracy & without errors?" />
        </h4>
        <br />
        <div>
          <textarea
            onChange={props.handleChange}
            value={props.rightText}
            disabled={props.theRightArea}
          />
        </div>
        <p>
          <MyText appText="Time Remaining" /> {props.timeRemaining}
        </p>
        <p>
          <MyText appText="Word Count" /> {props.countRightWords}
        </p>
        <p>
          <MyText appText="Accuracy" /> {props.accuracy}%
        </p>
        <ButtonRight
          startGame={props.startGame}
          startBtn={props.startBtn}
          buttonTxt="Start"
        />
      </form>
    </div>
  );
};

export default MyRightForm;
