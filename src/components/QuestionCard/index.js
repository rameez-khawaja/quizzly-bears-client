import React, { useState, useEffect } from 'react';
import { useSelector, useDispach } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import he from 'he';


export default function QuestionCard({ questionDetails, questionNumber }) {

  const targetTime = 20
  const [randomArray, setRandomArray] = useState([])
  const [timer, setTimer] = useState(targetTime);

  const quizState = useSelector((state) => state.quizState)
  const socket = useSelector((state) => state.socket)
  const player = useSelector((state) => state.player)
  const { question, category, difficulty, correct_answer, incorrect_answers } = questionDetails


  // Need counter, counter updates state which is reset when user goes to next question (or when timer runs out)
  // Need a state that manages the option they choose
  // That state needs to be compared to correct answer
  // Calculates score with time if answer is correct
  // Need to check of game is over
  // Dispatch to increase question number every 30 seconds ( only if Q# < 10 otherwise end game)

  useEffect(() => {
    let questionArray = []
    questionArray.push(correct_answer)
    for (let i = 0; i < incorrect_answers.length; i++) {
      questionArray.push(incorrect_answers[i])
    }

    for(let i=questionArray.length-1; i>0; i--) {
      let j = Math.floor(Math.random()*(i+1))
      let tempItem = questionArray[i]
      questionArray[i]=questionArray[j]
      questionArray[j] = tempItem
    }
    setRandomArray(questionArray)
  }, [question]);

//   const questionsToLoad = randomArray.map((q, index) =>
//         <Row className="answercard">
//             <Col className={"answer" + (index + 1)}>{q}</Col>
//         </Row>
// )

  function submitAnswer(e){
    const selected = e.target.textContent
    if (questionNumber <=10){
      dispatch(increaseQuestionNumber())
      setTimer(targetTime)
    } else {
      // At game end, sets game as finished in redux
    }
    if (selected === correct_answer && questionNumber <=10){
      let score = 50 + (2.5*counter)
      dispatch(increaseScore(player, score))
      socket.emit('update player score', {room: quizState.room, user: player, score})
    }
  }

  return (
    <div>
      <div className="d-flex">
        <h2>Category: {he.decode(category)}</h2>
        <h2>{questionNumber}/10</h2>
      </div>
      <Row className='questioncard'>
        <Col>Question: {he.decode(question)}</Col>
      </Row>
      <Container>
        <Row className='seperator'>
          <Col onClick={submitAnswer} className="answercard">{randomArray[0]}</Col>
          <Col onClick={submitAnswer} className="answercard">{randomArray[1]}</Col>
        </Row>
        <Row className='seperator'>
          <Col onClick={submitAnswer} className="answercard">{randomArray[2]}</Col>
          <Col onClick={submitAnswer} className="answercard">{randomArray[3]}</Col>
        </Row>
      </Container>
    </div>
  )
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
