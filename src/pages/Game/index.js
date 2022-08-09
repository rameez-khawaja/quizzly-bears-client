import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";

const Game = () => {
    const state = useSelector(state => state.quizState.questionNumber);
    return <div>Game loads</div>
}

export default Game;
