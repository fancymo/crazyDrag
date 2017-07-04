import React, { Component } from 'react';
import { Input, Button } from 'antd';
import './action.js';

export default class Display extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Input id="text" type="textarea" rows={4} />
        <Button onClick={this.handleClick}>button</Button>
        <div id="view" />
      </div>
    );
  }

  componentDidMount() {

  }

  handleClick() {
    const self = this;
    const text = document.querySelector('#text').value;
    const view = document.querySelector('#view');
    console.log(text);
    view.innerHTML = text;
  }

}
