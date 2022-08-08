import React, { useEffect, useState } from "react";
import { Home, Lobby, Game, HighScores, Results } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { storeSocket } from "./actions"
const io = require("socket.io-client");
const URL = "http://localhost:3000";

const App = () => {
  const [socket, setSocket] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io(URL);
    dispatch(storeSocket(newSocket));
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("user joining lobby", (user) => {
        if (currentUser === host) {
        dispatch(addUser(user));
        let newGame = { ...gameState };
        gameState.users.push({
          new: user,
          score: 0,
          completed: false
        })
        socket.emit("send state to players", newGameState);
      }
    })
  }
}, [socket, clientUser, host]);


  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/lobby">
        <Lobby />
      </Route>
      <Route path="/play">
        <Game />
      </Route>
      <Route path="/results">
        <Results />
      </Route>
      <Route path="/highscores">
        <HighScores />
      </Route>
    </Switch>
  );
}

export default App;
