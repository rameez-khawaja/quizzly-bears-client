import React, { useEffect, useState } from "react";
import { Home, Lobby, Game, HighScores, Results } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
const io = require("socket.io-client");
const URL = "http://localhost:3000";

const App = () => {
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
          <Route path="/highscores">
            <HighScores />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
        </Switch>
      );
}

export default App;
