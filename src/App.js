import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from './pages/landing';
import Lab11 from './pages/labs/Lab11';
import Lab12 from './pages/labs/Lab12';
import Lab21 from './pages/labs/Lab21';
import Lab22 from './pages/labs/Lab22';

import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/lab11" component={Lab11} />
      <Route exact path="/lab12" component={Lab12} />
      <Route exact path="/lab21" component={Lab21} />
      <Route exact path="/lab22" component={Lab22} />
    </Switch>
    <Landing />
  </BrowserRouter>
);

export default App;
