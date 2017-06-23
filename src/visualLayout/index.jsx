import React, { Component } from 'react';
import Sider from './sider';
import Container from './container';
import './index.less';
import '../config/style/codemirror.less';

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
