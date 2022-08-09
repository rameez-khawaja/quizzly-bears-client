import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import he from 'he';
import { increaseQuestionNumber } from '../../actions';


export default function QuestionCard({ questionDetails, questionNumber }) {

  const targetTime = 20
  const [randomArray, setRandomArray] = useState([])
  const [timer, setTimer] = useState(targetTime);

  const quizState = useSelector((state) => state.quizState)
  const socket = useSelector((state) => state.socket)
  const player = useSelector((state) => state.player)
  const { question, category, difficulty, correct_answer, incorrect_answers } = questionDetails

  const dispatch = useDispatch()

  useEffect(() => {
    let questionArray = []
    questionArray.push(correct_answer)
    for (let i = 0; i < incorrect_answers.length; i++) {
      questionArray.push(incorrect_answers[i])
    }

    for (let i = questionArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let tempItem = questionArray[i]
      questionArray[i] = questionArray[j]
      questionArray[j] = tempItem
    }
    setRandomArray(questionArray)
  }, [question]);

  function submitAnswer(e) {
    const selected = e.target.textContent
    if (questionNumber <= 10) {
      dispatch(increaseQuestionNumber())
      setTimer(targetTime)
    } else {
      // At game end, sets game as finished in redux
    }
    if (selected === correct_answer && questionNumber <= 10) {
      let score = 50 + (2.5 * counter)
      dispatch(increaseScore(player, score))
      socket.emit('update player score', { room: quizState.room, user: player, score })
    }
  }

  return (
    <div>
      <div className="d-flex">
        <h2>Category: {he.decode(category)}</h2>
        <h2>{questionNumber}/10</h2>
      </div>
      <Row className='questioncard'>
        <Col>
          Question: {he.decode(question)}
        </Col>
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