import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";

const Results = () => {
    const quizState = useSelector((state) => state.quizState);
    const socket = useSelector((state) => state.socket);
    const state = useSelector((state) => state);
    // console.log(state)
    return <div>Results loads</div>
}

export default Results;
