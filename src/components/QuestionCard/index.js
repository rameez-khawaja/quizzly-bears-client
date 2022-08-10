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
  const [finishedQuiz, setFinishedQuiz] = useState(false);
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
      setFinishedQuiz(true);
      console.log('The end');
    }



    if (selected === correct_answer && questionNumber <= 10) {
      let score = 50 + (2.5 * timer)
      dispatch(increaseScore(player, score))
      socket.emit('update player score', { room: quizState.room, user: player, score })

    }
  }

  const container = {
    hidden: { opacity: 0, scale: 0.5 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 1, 
        staggerChildren: 0.65,
      }
    },
    exit: {opacity: 0, scale: 0.5}
  }

  return (
    <motion.div 
    variants={container}
    initial="hidden"
    animate="show"
    exit="exit"
    >
      <motion.div 
          class="questioncard row"
          initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5}}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.75 }}
                    transition={{
                      default: {
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01]
                      },
                      scale: {
                        type: "spring",
                        damping: 10,
                        stiffness: 400,
                        restDelta: 0.001
                      }
                    }}
          >
        <motion.div className="col"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5}}
                  >Question: {he.decode(question)}</motion.div>
      </motion.div>
      <Container>
        <Row className='seperator'>
          <motion.div onClick={submitAnswer} className="answercard col"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{opacity: 0, scale: 0.5}}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    default: {
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    },
                    scale: {
                      type: "spring",
                      damping: 10,
                      stiffness: 400,
                      restDelta: 0.001
                    }
                  }}
          >{randomArray[0]}</motion.div>
          <motion.div onClick={submitAnswer} className="answercard col"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{opacity: 0, scale: 0.5}}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    default: {
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    },
                    scale: {
                      type: "spring",
                      damping: 10,
                      stiffness: 400,
                      restDelta: 0.001
                    }
                  }}
          >{randomArray[1]}</motion.div>
        </Row>
        <Row className='seperator'>
          <motion.div onClick={submitAnswer} className="answercard col"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{opacity: 0, scale: 0.5}}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    default: {
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    },
                    scale: {
                      type: "spring",
                      damping: 10,
                      stiffness: 400,
                      restDelta: 0.001
                    }
                  }}
          >{randomArray[2]}</motion.div>
          <motion.div onClick={submitAnswer} className="answercard col"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{opacity: 0, scale: 0.5}}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    default: {
                      duration: 0.3,
                      ease: [0, 0.71, 0.2, 1.01],
                    },
                    scale: {
                      type: "spring",
                      damping: 10,
                      stiffness: 400,
                      restDelta: 0.001
                    }
                  }}
          >{randomArray[3]}</motion.div>
        </Row>
      </Container>
      {finishedQuiz && <Navigate to='/results' />}
    </motion.div>
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


        // <div class="questioncard row">
        //   <div class="col">Question: What is the stage name of English female rapper Mathangi Arulpragasam, who is known for the song "Paper Planes"?
        //   </div>
        // </div>
        // <div class="container">
        //   <div class="seperator row">
        //     <div class="answercard col">K.I.A.
        //     </div>
        //     <div class="answercard col">M.I.A.
        //     </div>
        //   </div>
        //   <div class="seperator row">
        //     <div class="answercard col">C.I.A.
        //     </div>
        //     <div class="answercard col">A.I.A.
        //     </div>
        //   </div>
        // </div>
