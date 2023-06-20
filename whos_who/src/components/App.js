import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import GamePage from "./GamePage/GamePage";
import YouWonPage from "./YouWonPage/YouWonPage";
import YouLosePage from "./YouLosePage/YouLosePage";

const App = () => (
  <div>
    <Route path="/Gamepage" component={GamePage} />
    <Route path="/Youwon" component={YouWonPage} />
    <Route path="/Youlose" component={YouLosePage} />
    <Route exact path="/" component={Home} />
  </div>
);

export default App;
