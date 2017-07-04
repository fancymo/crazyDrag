import React, { Component } from 'react';
import { Input, Button } from 'antd';
import Loading from './loading';

const v = '<div class="demo"><div class="box draggable inline"><span class="fan-checkbox"><input type="checkbox" value="on" name="0012" title="OS0012"><label for="label" contenteditable="false">on</label></span></div><div class="box draggable inline"><span class="fan-checkbox"><input type="checkbox" value="on" name="0011" title="OD0011"><label for="label" contenteditable="false">on</label></span></div><div class="box draggable inline"><input type="text" class="ant-input input" style="width: 70px;" data-control="0012"></div></div>';
export default class Display extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Input id="text" type="textarea" rows={4} defaultValue={v} />
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
    view.innerHTML = text;
    Loading();
  }

}
