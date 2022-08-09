import React, { useState, useEffect } from 'react';
import { useSelector, useDispach } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';
import he from 'he';
import { increaseQuestionNumber } from '../../actions';


export default function QuestionCard({ questionDetails, questionNumber }) {


  const [randomArray, setRandomArray] = useState([])
  const quizState = useSelector((state) => state.quizState)
  const socket = useSelector((state) => state.socket)
  const player = useSelector((state) => state.player)



  const [gameFinished, setGameFinished] = useState(false);
  const [timerCount, setTimerCount] = useState(30)
  const [selectAnswer, setSelectAnswer] = useState('')
  const { question, category, difficulty, correct_answer, incorrect_answers } = questionDetails



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

  function handleChange(e) {
    e.preventDefault()
    setSelectAnswer(e.target.value)
  }

  useEffect(() => {
    if (quizState.questionNumber <= 10) {
      dispatch(increaseQuestionNumber())
      setTimerCount(30)
    } else {
      console.log('Game Over')
      setIsGameOver(true)
    }
  })

  function submitAnswer(e) {
    e.preventDefault();
    if (quizState.questionNumber <= 10) {
      dispatch(increaseQuestionNumber());
      setCounter(30);
    } else {
      console.log('Game Over');
      setIsGameOver(true);
    }

    if (selectAnswer === correct_answer && quizState.questionNumber <= 10) {
      let score = 50 + (2.5 * counter)
      dispatch(increaseScore(player, score))
      socket.emit('update player score', { room: quizState.room, user: player, score })
    }
  }



  const questionsToLoad = randomArray.map(q =>
    <div className='col-md-6 mb-3 justify-content-center'>
      <div className="card m-2 " style={{ width: '120px' }} key={Math.random()}>
        <div className="card-body">
          <h5 className="card-title">{he.decode(q)}</h5>
        </div>
      </div>
    </div>)

  return (
    <div>
      <div>
        <h2>Category: {he.decode(category)}</h2>
        <h2>{questionNumber}/10</h2>
      </div>
      <div className='card'>
        <h2>Question: {he.decode(question)}</h2>
      </div>
      <div className="container mt-4" >
        <div className="row d-flex justify-content-center">
          {he.decode(questionsToLoad)}
          <form onSubmit={submitAnswer}>
            <input value={selectAnswer} onChange={handleChange} />
          </form>
          <button type="submit">Submit</button>
        </div>
      </div>

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
