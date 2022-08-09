import React, { useState, useEffect } from 'react';
import { useSelector, useDispach } from 'react-redux';
import { Navigate } from 'react-router-dom';
import he from 'he';
import { incrementQuestionNumber } from '../../actions';


export default function QuestionCard({ questionDetails, questionNumber }) {

  const [randomArray, setRandomArray] = useState([])
  const quizState = useSelector((state) => state.quizState)
  const socket = useSelector((state) => state.socket)
  const player = useSelector((state) => state.player)

  console.log(quizState)

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
      dispatchEvent(incrementQuestionNumber())
      setTimerCount(30)
    } else {
      console.log('Game Over')
      setIsGameOver(true)
    }
  })

  function submitAnswer(e) {
    e.preventDefault();
    if (quizState.questionNumber <= 10) {
      dispatch(incrementQuestionNumber());
      setCounter(30);
    } else {
      console.log('Game Over');
      setIsGameOver(true);
    }

    if (selectedOption === correct_answer && gameState.questionNumber <= 10) {
      let score = 100 + (2 * counter);
      dispatch(updateScore(clientUser, score));
      socket.emit('update player score', { room: gameState.roomName, user: clientUser, score })
    };
  }


  const questionsToLoad = randomArray.map(q =>
    <div className='col-md-6 mb-3 justify-content-center'>
      <div className="card m-2 " style={{ width: '120px' }} key={Math.random()}>
        <div className="card-body">
          <h5 className="card-title">{he.decode(q)}</h5>
        </div>
      </div>
    </div>
  )

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
          <form onSubmit={submitAnswer}>
            <input value={selectAnswer} onChange={handleChange} />
          </form>
          <button type="submit">Submit</button>
        </div>
      </div>
    </div>
  )
}
