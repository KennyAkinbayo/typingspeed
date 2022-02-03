import React from "react";
import ButtonLeft from "./ButtonLeft";
import MyText from "./MyText";

const MyLeftForm = (props) => {
  return (
    <div>
      <form>
        <div>
          <ButtonLeft
            buttonTxt="Select Paragraph"
            isTimeRunning={props.isTimeRunning}
            btnState={props.btnState}
            handleLeftClick={props.handleLeftClick}
          />
        </div>
        <h4>
          <MyText appText="The paragrah you selected!" />
        </h4>
        <div>
          <textarea
            disabled={props.leftParaText}
            value={props.selectedParagraph}
          />
        </div>
        <p>
          <MyText appText="Total Number of Words " />
          {props.countParaWords}
        </p>
        <p>
          <MyText appText="Select Timer in Seconds" />
        </p>

        <select
          value={props.timeRemaining}
          onChange={props.handleTimer}
          disabled={props.isTimeRunning ? props.btnState : !props.btnState}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </form>
    </div>
  );
};

export default MyLeftForm;
