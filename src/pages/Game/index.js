import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { QuestionCard } from "../../components";
import { motion, AnimatePresence } from "framer-motion";
import { Row } from 'react-bootstrap';


const containerUser = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
      opacity: 1,
      scale: 1,
      transition: {
          delay: 1,
          staggerChildren: 0.65,
      }
  },
  exit: { opacity: 0, scale: 0.5 }
}
const containerCategory = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
      opacity: 1,
      scale: 1,
      transition: {
          delay: 0.5,
          staggerChildren: 0.65,
      }
  },
  exit: { opacity: 0, scale: 0.5 }
}

const Game = () => {
  const questionNumber = useSelector((state) => state.quizState.questionNumber);
  const allQuestions = useSelector((state) => state.quizState.questions);
  const allUsers = useSelector((state) => state.quizState.users);
  const quizState = useSelector((state) => state.quizState);
  const player = useSelector((state) => state.player);
  const socket = useSelector((state) => state.socket);

  const players = allUsers.map((player) => (
    <div
      className="card m-2 text-center"
      style={{ width: "120px" }}
      key={Math.random()}
    >
      <div className="card-body">
        <h5 className="card-title">{player.name}</h5>
        <h6 className="card-subtitle">{player.score}</h6>
      </div>
    </div>
  ));

  questionNumber > 10
    ? socket.emit("finish quiz", { room: quizState.room, player: player })
    : null;


  return (
    <section>
      <motion.div className="d-flex justify-content-center text-center text-light"
                variants={containerCategory}
                initial="hidden"
                animate="show"
                exit="exit">
                <h5><b>{quizState.category} - {questionNumber}/10</b></h5>
            </motion.div>
            <div>
                <Row>
                <motion.div className="d-flex justify-content-center"
                    variants={containerUser}
                    initial="hidden"
                    animate="show"
                    exit="exit">
                    {players}
                </motion.div>
                </Row>
                {questionNumber <= 10 && (
                    <AnimatePresence exitBeforeEnter>
                        <QuestionCard questionDetails={allQuestions[questionNumber - 1]} questionNumber={questionNumber} />
                    </AnimatePresence>
                )}
            </div>
            {questionNumber > 10 && <Navigate to="/results" />}
        </section>
  );
};

export default Game;
