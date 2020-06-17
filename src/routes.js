import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './views/Home';
import Directions from './views/Directions';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/directions" component={Directions} />
      </Switch>
    </Router>
    );
  }
  