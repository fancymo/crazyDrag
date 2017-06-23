import React from 'react';
import ReactDom from 'react-dom';
import CodeMirror from 'react-codemirror';
import { Router, Route, IndexRoute, hashHistory, IndexRedirect } from 'react-router';

import Routes from './routes.jsx';

ReactDom.render(Routes, document.getElementById('main'));
