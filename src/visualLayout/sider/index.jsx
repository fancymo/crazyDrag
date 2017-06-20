import React, { Component } from 'react';
import Box from '../box';
import Configure from '../configure';
import { Input, Label, Row } from '../component';
import BoxRow from './box-row';
import Action from '../action';
import Store from '../store';

export default class Sider extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div id="sider" className="layout-sider">
        <ul className="accordion-group">
          <li>布局</li>
          <li>
            <BoxRow />
            <BoxRow defaultValue="4,8" />
            <BoxRow defaultValue="3,9" />
          </li>
        </ul>
        <ul className="accordion-group">
          <li>组件</li>
          <li>
            <Box inline preview="Label" ><Label /></Box>
            <Box inline preview="输入框" ><Input /></Box>
          </li>
        </ul>
        <Configure />
      </div>);
  }

  componentDidMount() {}

}
