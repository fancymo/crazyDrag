import React, { Component } from 'react';
import { Button } from 'antd';
import BoxRow from '../sider/box-row';

export default class Container extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div id="container" className="layout-container">
        <div className="action-bar">
          <Button onClick={this.handlePreview}>预览</Button>
          <Button onClick={this.handleDownload}>下载</Button>
        </div>
        <div className="demo" />
      </div>);
  }

  componentDidMount() {}

  handlePreview() {
    const self = this;
  }

  handleDownload() {
    const self = this;
  }
}
