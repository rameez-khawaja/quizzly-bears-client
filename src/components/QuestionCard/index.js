import React, { useState, useEffect, useRef } from "react";
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
  const timerRef = useRef();

  // Need counter, counter updates state which is reset when user goes to next question (or when timer runs out)
  // Calculates score with time if answer is correct
  // Dispatch to increase question number every 30 seconds ( only if Q# < 10 otherwise end game)

  // collect and shuffle answer cards
  useEffect(() => {
    let questionArray = [];
    questionArray.push(he.decode(correct_answer), he.decode(incorrect_answers[0]), he.decode(incorrect_answers[1]), he.decode(incorrect_answers[2]));
    for (let i = questionArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tempItem = questionArray[i];
      questionArray[i] = questionArray[j];
      questionArray[j] = tempItem;
    }
    setRandomArray(questionArray);
    function minusSecond(){
      setTimer(prevTime => prevTime - 1)
    }
    const countDown = setInterval(()=>minusSecond(), 1000)
    return () => clearInterval(countDown)
  }, [question]);

  // useEffect(() =>{
  //   function minusSecond(){
  //     setTimer(prevTime => prevTime - 1)
  //   }
  //   const countDown = setInterval(()=>minusSecond(), 1000)
  //   return () => clearInterval(countDown)
  // }, [question])

  useEffect(() => {
    if (timer == 0) {
      if (questionNumber <= 10) {
        dispatch(increaseQuestionNumber());
        setTimer(targetTime);
      } else {
        setFinishedQuiz(true);
      }
    }
    resetTimer();
  }, [timer])

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
      let score = Math.floor(50 + (2.5 * timer));
      dispatch(increaseScore(player, score));
      socket.emit("update player score", {
        room: quizState.room,
        player: player,
        score
      });
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

  const resetTimer = () => {
    timerRef.current.style.width = `${timer * 10 / 2}%`;
  }
  
  return (
    <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    exit="exit"
    >
      <section className="container col-12 d-flex justify-content-center">
        <section className="progress-bar-container col-8 py-4">
          <div className="progress-bar bg-danger rounded">
            <div className="time-left progress-bar progress-bar-striped progress-bar-animated bg-warning rounded" ref={timerRef}>
              {timer}
            </div>
          </div>
        </section>
      </section>
      <motion.div
          className="questioncard row"
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
        <Row className="seperator">

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
          >
           {randomArray[0]}
           </motion.div>
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
          >
           {randomArray[1]}
           </motion.div>
        </Row>
        <Row className="seperator">
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
          >
           {randomArray[2]}
           </motion.div>

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
          >
           {randomArray[3]}
           </motion.div>
        </Row>
      </Container>
      {finishedQuiz && <Navigate to="/results" />}
      </motion.div>
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
