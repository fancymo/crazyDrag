import React, { Component } from 'react';
import { Button } from 'antd';
import ClassNames from 'classnames';
import BoxRow from '../sider/box-row';
import Action from '../action';
import Store from '../store';

export default class Container extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = Store.getState();
    [
      'handleStateChange',
      'handlePreview',
      'handleDownload',
      'handleEdit'
    ].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  render() {
    const cls = ClassNames('demo', {
      edit: this.state.page.editable
    });
    return (
      <div id="container" className="layout-container">
        <div className="action-bar">
          <Button type="primary" onClick={this.handleEdit}>编辑</Button>
          <Button type="primary" onClick={this.handlePreview}>预览</Button>
          <Button type="primary" onClick={this.handleDownload}>下载</Button>
        </div>
        <div className={cls} />
      </div>);
  }

  componentDidMount() {
    this.unsubscribe = Store.subscribe(this.handleStateChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleStateChange() {
    const state = Store.getState();
    this.setState(state);
  }

  /* 切换为预览状态*/
  handlePreview() {
    const self = this;
    const editable = false;
    Action.updatePage({ editable });
  }

  /* 下载模版*/
  handleDownload() {
    const self = this;
  }

  /* 切换为编辑状态 */
  handleEdit() {
    const self = this;
    const editable = true;
    Action.updatePage({ editable });
  }
}
