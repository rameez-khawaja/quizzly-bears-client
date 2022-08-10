import React, { useEffect, useState } from "react";
import { Home, Lobby, Game, HighScores, Results } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
const io = require("socket.io-client");
const URL = "http://localhost:3000";
import './App.css'
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import {
  changeState,
  storeSocket,
  addUser,
  updateScore,
  quizFinished,
} from "./actions";

const App = () => {
  const [socket, setSocket] = useState();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.player);
  const host = useSelector((state) => state.quizState.host);
  const quizState = useSelector((state) => state.quizState);
  const location = useLocation();

  useEffect(() => {
    const newSocket = io(URL);

    newSocket.on("change state", (state) => {
      dispatch(changeState(state));
    });

    newSocket.on("update opponent completion", (currentUser) => {
      dispatch(quizFinished(currentUser));
    });

    dispatch(storeSocket(newSocket));
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("user joining lobby", (player) => {
        if (currentUser === host) {
          dispatch(addUser(player));
          let newGame = { ...quizState };
          quizState.users.push({
            name: player,
            score: 0,
            completed: false
          })
          socket.emit("send state to players", newGame);
        }
      })
    }
  }, [socket, currentUser, host]);


  return (
    <AnimatePresence exitBeforeEnter>
    <Routes location={location} key={location.pathname}>
      <Route exact path="/" element={<Home />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/play" element={<Game />} />
      <Route path="/results" element={<Results />} />
      <Route path="/highscores" element={<HighScores />} />
    </Routes>
    </AnimatePresence>
  );
}

export default App;
