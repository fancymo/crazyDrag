import React, { Component } from 'react';
import fetchIntercept from '../config/modules/fetch-intercept';
import Store from './store';
import Sider from './sider';
import Container from './container';
import './index.less';

window.fetch = fetchIntercept(fetch, Store);
export default class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div id="layout" className="layout">
        <Sider />
        <Container />
      </div>
    );
  }

  componentDidMount() {}

}
