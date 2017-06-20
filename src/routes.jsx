import React from 'react';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect } from 'react-router';
import VisualLayout from './visualLayout';
import Drag from './widgets/drag';

const Sorts = () => {
  return (<Drag sortItems={[1, 2, 3]} />);
};

export default (
  <Router history={hashHistory}>
    <Route path="/" component={VisualLayout} />
    <Route path="drag" component={Sorts} />
  </Router>
);
