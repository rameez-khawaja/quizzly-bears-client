import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'
const Results = () => {
    const quizState = useSelector((state) => state.quizState);
    const player = useSelector((state) => state.player);
    const state = useSelector((state) => state);

    const playerScoreIndex = quizState.users.findIndex(i => i.name === player)
    let scoreToSubmit = quizState.users[playerScoreIndex].score

    axios.post('http://localhost:3000/low', {
    username: player,
    score: scoreToSubmit
    })







    return (
    <div>Results loads</div>
    )
}

export default Results;
