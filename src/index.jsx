import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect } from 'react-router';

import Routes from './routes.jsx';
// import Drag from './widgets/drag';
// import VisualLayout from './visualLayout';


ReactDom.render(Routes, document.getElementById('main'));
