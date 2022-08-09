import React, { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { QuestionCard } from "../../components";
import { Socket } from "socket.io-client";

const Game = () => {
    const questionNumber = useSelector((state) => state.quizState.questionNumber);
    const allQuestions = useSelector((state) => state.quizState.questions);
    const allUsers = useSelector((state) => state.quizState.users);
    const quizState = useSelector((state) => state.quizState)
    const player = useSelector((state) => state.player)

    console.log(quizState)

    const players = allUsers.map(player =>
        <div className="card m-2" style={{ width: '80px' }} key={Math.random()}>
            <div className="card-body">
                <h5 className="card-title">{player.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{player.score}</h6>
            </div>
        </div>
    )

    questionNumber > 10 ? Socket.emit('complete quiz', { room: quizState.room, player: player }) : null

    return (
        <section>
            <div> hello, see below for le question carde </div>
            <section>
                {questionNumber <= 10 && (
                    <div>
                        <QuestionCard question={allQuestions[questionNumber - 1]} />
                    </div>
                )}
                <div className="d-flex justify-content-center">
                    {players}
                </div>
            </section>
            {questionNumber > 10 && <Navigate to="/results" />}
        </section>
    );
};


export default Game;
