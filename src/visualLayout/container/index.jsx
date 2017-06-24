import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import ClassNames from 'classnames';
import CodeModal from './codemodal';
import Action from '../action';
import Store from '../store';

function loopChild(node) {
  const arr = [];
  const childs = node.childNodes;
  childs && childs.forEach((item) => {
    let hasChild = false;
    let elem = item.cloneNode(true);
    if (item.classList.contains('box')) {
      if (item.classList.contains('space')) {
        elem = item.cloneNode(false);
      } else {
        elem = item.cloneNode(false);
        item = item.querySelector('.view');
        hasChild = true;
      }
    }
    if (item.classList.contains('demo')) {
      item.classList.remove('edit');
      hasChild = true;
      elem = item.cloneNode(false);
    }
    if (item.classList.contains('fan-row')) {
      hasChild = true;
      elem = item.cloneNode(false);
    }
    if (item.className.indexOf('fan-col') > -1) {
      hasChild = true;
      elem = item.cloneNode(false);
    }
    elem.removeAttribute('draggable');
    elem.removeAttribute('contenteditable');
    const obj = {
      elem,
      children: hasChild ? loopChild(item) : null
    };
    arr.push(obj);
  });
  return arr.length ? arr : null;
}

export default class Container extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = Store.getState();
    [
      'handleStateChange',
      'handlePreview',
      'handleDownload',
      'handleEdit',
      'handleDownloadModalOK',
      'handleDownloadModalCancel'
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
        <CodeModal {...this.state} onOk={this.handleDownloadModalOK} onCancel={this.handleDownloadModalCancel} />
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
    const demo = document.getElementsByClassName('demo')[0];
    const domObj = {
      elem: demo.cloneNode(false),
      children: loopChild(demo)
    };
    const codeModal = {
      visible: true,
      data: domObj
    };
    Action.updatePage({ codeModal });
  }

  /* 模版下载 OK */
  handleDownloadModalOK() {
    const codeModal = this.state.page.codeModal;
    codeModal.visible = false;
    Action.updatePage({ codeModal });
  }

  /* 模版下载 Cancel */
  handleDownloadModalCancel() {
    const codeModal = this.state.page.codeModal;
    codeModal.visible = false;
    Action.updatePage({ codeModal });
  }

  /* 切换为编辑状态 */
  handleEdit() {
    const self = this;
    const editable = true;
    Action.updatePage({ editable });
  }
}
