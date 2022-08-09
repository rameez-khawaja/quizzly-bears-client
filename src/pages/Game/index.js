import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { QuestionCard } from "../../components";

const Game = () => {
  const questionNumber = useSelector((state) => state.quizState.questionNumber);
  const allQuestions = useSelector((state) => state.quizState.questions);
  console.log(allQuestions)

  return (
    <section>
      <div> hello, see below for le question carde </div>
      <section>
        {questionNumber <= 10 && (
          <div>
            <QuestionCard allQuestions={allQuestions[questionNumber-1]} />
          </div>
        )}
      </section>
      {questionNumber > 10 && <Navigate to="/results" />}
    </section>
  );
};

export default Game;
