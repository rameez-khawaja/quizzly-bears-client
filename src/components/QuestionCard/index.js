import React, { useState, useEffect } from 'react';
import { useSelector, useDispach } from 'react-redux';
import { Col, Row, Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import he from 'he';

<Container>
  <Row>
    <Col></Col>
  </Row>
  <Row>
    <Col></Col>
    <Col></Col>
  </Row>
  <Row>
    <Col></Col>
    <Col></Col>
  </Row>
</Container>


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

//   const questionsToLoad = randomArray.map((q, index) =>
//         <Row className="answercard">
//             <Col className={"answer" + (index + 1)}>{q}</Col>
//         </Row>
// )

  return (
    <div>
      <div>
        <h2>Category: {he.decode(category)}</h2>
        <h2>{questionNumber}/10</h2>
      </div>
      <Row className='questioncard'>
        <Col>Question: {he.decode(question)}</Col>
      </Row>
      <Container>
        <Row className='seperator'>
          <Col className="answercard">{randomArray[0]}</Col>
          <Col className="answercard">{randomArray[1]}</Col>
        </Row>
        <Row className='seperatorb'>
          <Col className="answercard">{randomArray[2]}</Col>
          <Col className="answercard">{randomArray[3]}</Col>
        </Row>
      </Container>
    </div>
  )
}


// const questionNumber = useSelector((state) => state.quizState.questionNumber);
//   const allQuestions = useSelector((state) => state.quizState.questions);
//   console.log(allQuestions[questionNumber-1])

//   return (
//     <section>
//       <section>
//         {questionNumber <= 10 && (
//           <div>
//             <QuestionCard allQuestions={allQuestions[questionNumber-1]} />
//           </div>
//         )}
//       </section>
//       {questionNumber > 10 && <Navigate to="/results" />}
//     </section>
//   );
