import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { QuestionCard } from "../../components";

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
      <div className="d-flex justify-content-center text-center text-light">
        <h5>
          <b>
            {quizState.category} - {questionNumber}/10
          </b>
        </h5>
      </div>
      <div>
        <div className="d-flex justify-content-center">{players}</div>
        {questionNumber <= 10 && (
          <div>
            <QuestionCard
              questionDetails={allQuestions[questionNumber - 1]}
              questionNumber={questionNumber}
            />
          </div>
        )}
      </div>
      {questionNumber > 10 && <Navigate to="/results" />}
    </section>
  );
};

export default Game;
