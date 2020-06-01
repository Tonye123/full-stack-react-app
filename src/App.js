import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HighScores from './pages/HighScores';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Game from './pages/Game';
import GameOver from './pages/GameOver'
import { Container } from './styled/container'
import { Main } from './styled/main';
import Global from './styled/global';
import { useAuth0 } from './auth';


function App() {
  const { loading } = useAuth0();

  if(loading) {
    return <p>Loading....</p>
  }
  return (
    <Router>
      <Global />
      <Main>
        <Container>
          <NavBar />
          <Switch>
          
              <Route path="/highScores" component={HighScores} />
              <Route path="/game" component={Game} />
              <Route path="/gameOver" component={GameOver} />
              <Route path="/" component={Home} />
          </Switch>
        </Container>
      </Main>
    </Router>
  );
}

export default App;
