import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
    const [createGame, setCreateGame] = useState(false);
    const [joinGame, setJoinGame] = useState(false);
    const [username, setUsername] = useState("");
    const [checkForm, setcheckForm] = useState(false);





    return <div>Home loads</div>
}

export default Home;
