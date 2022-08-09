import React, { useEffect, useState } from "react";
import { Home, Lobby, Game, HighScores, Results } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
const io = require("socket.io-client");
const URL = "http://localhost:3000";
import './App.css'

import {
  changeState,
  storeSocket,
  addUser,
  updateScore,
  setQuizAsComplete,
} from "./actions";

const App = () => {
  const [socket, setSocket] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.player);
  const host = useSelector((state) => state.quizState.host);
  const quizState = useSelector((state) => state.quizState);

  useEffect(() => {
    const newSocket = io(URL);
    newSocket.on("change state", (state) => {
      dispatch(changeState(state));
    });
    dispatch(storeSocket(newSocket));
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("user joining lobby", (user) => {
        if (currentUser === host) {
          dispatch(addUser(user));
          let newGame = { ...quizState };
          quizState.users.push({
            name: user,
            score: 0,
            completed: false
          })
          socket.emit("send state to players", newGame);
        }
      })
    }
  }, [socket, currentUser, host]);


  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/play" element={<Game />} />
      <Route path="/results" element={<Results />} />
      <Route path="/highscores" element={<HighScores />} />
    </Routes>
  );
}

export default App;
