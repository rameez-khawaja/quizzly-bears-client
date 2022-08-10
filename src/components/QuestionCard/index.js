import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";
import he from "he";
import { increaseQuestionNumber, increaseScore } from "../../actions";
const targetTime = 20;

export default function QuestionCard({ questionDetails, questionNumber }) {
  const [randomArray, setRandomArray] = useState([]);
  const [timer, setTimer] = useState(targetTime);
  const [finishedQuiz, setFinishedQuiz] = useState(false);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const quizState = useSelector((state) => state.quizState);
  const socket = useSelector((state) => state.socket);
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const { question, category, difficulty, correct_answer, incorrect_answers } =
    questionDetails;

    // TODO: Console logging state to know what to call

  // const state = useSelector((state) => state);
  // console.log(state);

  // Need counter, counter updates state which is reset when user goes to next question (or when timer runs out)
  // Need a state that manages the option they choose
  // That state needs to be compared to correct answer
  // Calculates score with time if answer is correct
  // Need to check of game is over (done)
  // Dispatch to increase question number every 30 seconds ( only if Q# < 10 otherwise end game)

  // collect and shuffle answer cards
  useEffect(() => {
    let questionArray = [];
    questionArray.push(correct_answer);
    questionArray.push(...incorrect_answers);
    for (let i = questionArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tempItem = questionArray[i];
      questionArray[i] = questionArray[j];
      questionArray[j] = tempItem;
    }
    setRandomArray(questionArray);
  }, [question]);

  // submit players answer AND update score
  function submitAnswer(e) {
    const selected = e.target.textContent;
    setPlayerAnswer(selected);
    // console.log(selected);
    if (questionNumber <= 10) {
      // move player to the next question
      dispatch(increaseQuestionNumber());
      // reset countdown timer
      setTimer(targetTime);
    } else {
      // At game end, sets game as finished in redux
      setFinishedQuiz(true);
      // console.log("The end");
    }

    if (selected === correct_answer && questionNumber <= 10) {
      // let score = 50 + (2.5 * timer);
      let score = 50
      dispatch(increaseScore(player, score));
      socket.emit("update player score", {
        room: quizState.room,
        player: player,
        score
      });
    }
  }

  return (
    <div>
      <Row className="questioncard">
        <Col>Question: {he.decode(question)}</Col>
      </Row>
      <Container>
        <Row className="seperator">
          <Col onClick={submitAnswer} className="answercard">
            {randomArray[0]}
          </Col>
          <Col onClick={submitAnswer} className="answercard">
            {randomArray[1]}
          </Col>
        </Row>
        <Row className="seperator">
          <Col onClick={submitAnswer} className="answercard">
            {randomArray[2]}
          </Col>
          <Col onClick={submitAnswer} className="answercard">
            {randomArray[3]}
          </Col>
        </Row>
      </Container>
      {finishedQuiz && <Navigate to="/results" />}
    </div>
  );
}

// <motion.div
// initial={{ opacity: 0, scale: 0.5 }}
// animate={{ opacity: 1, scale: 1 }}
// whileHover={{ scale: 1.05 }}
// transition={{
//     default: {
//         duration: 0.3,
//         ease: [0, 0.71, 0.2, 1.01],
//     },
//     scale: {
//         type: "spring",
//         damping: 10,
//         stiffness: 400,
//         restDelta: 0.001
//     }
// }}
