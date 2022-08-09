import React, { useState, useEffect } from 'react';
import { useSelector, useDispach } from 'react-redux';
import { Navigate } from 'react-router-dom';
import he from 'he';


export default function QuestionCard({ questionDetails, questionNumber }) {

  const [randomArray, setRandomArray] = useState([])

  const quizState = useSelector((state) => state.quizState)
  const socket = useSelector((state) => state.socket)
  const player = useSelector((state) => state.player)
  const { question, category, difficulty, correct_answer, incorrect_answers } = questionDetails

  console.log(questionDetails)
  // Need counter, counter updates state which is reset when user goes to next question (or when timer runs out)
  // Answers need to be shuffled
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

  const questionsToLoad = randomArray.map(q =>
    <div className="card m-2" style={{ width: '120px' }} key={Math.random()}>
        <div className="card-body">
            <h5 className="card-title">{q}</h5>
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
        <div>{questionsToLoad}</div>
      </div>
    </div>
  )
}
