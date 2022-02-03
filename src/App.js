import "./App.css";
import { useState, useEffect, useRef } from "react";
import paragraph from "./components/paragraph.json";
import MyLeftForm from "./components/MyLeftForm";
import MyRightForm from "./components/MyRightForm";

function App() {
  const STARTING_TIME = 5;
  const DEFAULT_VALUE = 0;
  const inputRef = useRef(null);

  const [paragraphs, setParagraphs] = useState(paragraph); // get the array of objects of paragraphs from the json files
  const [selectedParagraph, setSelectedParagraph] = useState("");
  const [countParaWords, setCountParaWords] = useState(0); // count the left paragraph words
  const [countRightWords, setCountRightWords] = useState(0); // count the right paragraph words
  const [btnState, setBtnState] = useState(true);
  const [leftParaText, leftSetParaText] = useState(true); // set the paragraph text area to false;
  const [rightText, setRightText] = useState(""); // initialize the right paragraph to an empty text
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME); // set the default time remaining
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [theRightArea, setTheRightArea] = useState(true);
  const [startBtn, setStartBtn] = useState(true);
  const [accuracy, setAccuracy] = useState(DEFAULT_VALUE);

  function handleLeftClick(event) {
    event.preventDefault();
    setStartBtn(false);
    const newParagraphs = [...paragraphs];
    const lengthArr = newParagraphs.length; //get the length of the array
    const rndNumber = Math.floor(Math.random() * lengthArr);

    //Select the paragraph and randomly pick one!
    let newSelectedParagraph = newParagraphs[rndNumber].paragraph;
    setSelectedParagraph(newSelectedParagraph); //update the selected paragraph
    countParagraphWords(newSelectedParagraph); //count the number of words in the paragraph annd call the function
    setCountRightWords(DEFAULT_VALUE); //initializes the right words count to be zero
    setAccuracy(DEFAULT_VALUE); //initializes the accuracy percentage to be zero
    setRightText("");
    setTimeRemaining(STARTING_TIME);
  }

  function countParagraphWords(text) {
    const wordsArr = text.trim().split(" ");
    const filteredWords = wordsArr.filter((word) => word !== "");
    setCountParaWords(filteredWords.length);
  }

  function countRight(text) {
    const wordsArr = text.trim().split(" ");
    const filteredWords = wordsArr.filter((word) => word !== "");
    setCountRightWords(filteredWords.length);
  }

  function startGame(event) {
    event.preventDefault();
    // condition here

    setIsTimeRunning(true);
    setTheRightArea(false);
    inputRef.current.focus();
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      let myAcc = calcAccuracy(selectedParagraph, rightText);

      setAccuracy(myAcc);
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  function endGame() {
    setIsTimeRunning(false);
    countRight(rightText);
    setTheRightArea(true); // make sure the right area is now disabled!
    setStartBtn(true); // disable the start game button as well
  }

  function handleChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setRightText(value); // set the right paragraph to what is being typed!!!
  }

  function handleTimer(event) {
    event.preventDefault();
    const { value } = event.target;
    setTimeRemaining(value);
    setCountRightWords(DEFAULT_VALUE); // set to zero
    setAccuracy(DEFAULT_VALUE); // set the accuracy to zero
  }

  function calcAccuracy(sentence1, sentence2) {
    let score = 0;
    let newSentence1 = sentence1.trim().split(" ");
    let newSentence2 = sentence2.trim().split(" ");

    for (let i = 0; i < newSentence2.length; i++) {
      if (newSentence1[i] === newSentence2[i]) {
        score++;
      }
    }

    let percentAccuracy = ((score / newSentence1.length) * 100).toFixed(0);
    return percentAccuracy;
  }

  return (
    <div className="App">
      <div className="leftSide">
        <MyLeftForm
          leftParaText={leftParaText}
          selectedParagraph={selectedParagraph}
          countParaWords={countParaWords}
          timeRemaining={timeRemaining}
          isTimeRunning={isTimeRunning}
          btnState={btnState}
          handleLeftClick={handleLeftClick}
          handleTimer={handleTimer}
        />
      </div>
      <div className="rightSide">
        <MyRightForm
          handleChange={handleChange}
          rightText={rightText}
          theRightArea={theRightArea}
          timeRemaining={timeRemaining}
          countRightWords={countRightWords}
          accuracy={accuracy}
          startGame={startGame}
          startBtn={startBtn}
        />
      </div>
    </div>
  );
}

export default App;
