import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Dropdown, Radio, Button } from 'antd';
import throttle from '../../config/modules/throttle';
import Action from '../action';

import './index.less';

const propTypes = {
  preview: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]), // 展示的标题
  inline: PropTypes.bool,  // 行内布局
  border: PropTypes.bool,
  mode: PropTypes.oneOf(['horizontal', 'vertical'])
};

const defaultProps = {
  preview: '标题',
  inline: false,
  border: false,
};

class Box extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
    [
      'handleDragStart',
      'handleDragEnd',
      'handleDragOver',
      'handleDrop',
      'handleSlibingDragEnter',
      'handleDragEnter',
      'handleEventBind',
      'handleBoxClick',
      'handleListenerRemove'
    ].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  render() {
    const { preview, inline, border, mode, children } = this.props;
    const cls = ClassNames('box', 'draggable', {
      inline,
      space: mode,
      'space-horizontal': mode && mode === 'horizontal',
      'space-vertical': mode && mode === 'vertical'
    });
    return (
      <div className={cls} draggable ref={(box) => { this.box = box; }}>
        <span className="opt-remove">删除</span>
        { border && <span className="opt-border">边框</span> }
        { mode && <div className="pseudo-element" /> }
        {
          mode && (
            <div className="size-group">
              { mode === 'horizontal' && <span className="opt-adapt">撑开</span> }
              <span className="opt-large">大</span>
              <span className="opt-middle">中</span>
              <span className="opt-small">小</span>
            </div>
          )
        }
        <div className="preview">{preview}</div>
        <div className="view">{children}</div>
      </div>);
  }

  componentDidMount() {
    this.box.addEventListener('dragstart', this.handleDragStart);
    this.box.addEventListener('dragend', this.handleDragEnd);

    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    this.placeholder = placeholder;
  }

  /* drag start */
  handleDragStart(e) {
    e.stopPropagation();
    this.dragDOM = e.target;
    if (this.dragDOM.classList.contains('inline')) {
      this.placeholder.classList.add('inline');
    } else {
      this.placeholder.classList.remove('inline');
    }
    this.placeholder.style.height = `${this.dragDOM.offsetHeight}px`;
    this.placeholder.style.width = `${this.dragDOM.offsetWidth}px`;
    this.containers = document.querySelectorAll('#container .demo, .layout-container div[class^=fan-col]');

    this.containers && this.containers.forEach((item) => {
      item.addEventListener('dragover', this.handleDragOver);
      item.addEventListener('drop', this.handleDrop);
      item.addEventListener('dragenter', throttle(this.handleDragEnter, 300));
    });

    this.boxes = document.querySelectorAll('#container .box');
    this.boxes && this.boxes.forEach((item) => {
      // item.addEventListener('dragenter', throttle(this.handleSlibingDragEnter, 300));
    });
  }

  /* 情空指针 */
  handleDragEnd(e) {
    this.over = null;
    this.dragDOM = null;
    const hasPlaceholder = document.querySelector('#container').contains(this.placeholder);
    if (hasPlaceholder) {
      this.placeholder.parentNode.removeChild(this.placeholder);
    }
  }

  handleDragOver(e) {
    const self = this;
    e.preventDefault();
  }

  handleDrop(e) {
    if (!this.dragDOM) return false;
    const dropDOM = e.currentTarget;
    const newDOM = this.dragDOM.cloneNode(true);
    this.handleEventBind(newDOM);
    this.placeholder.parentNode && dropDOM.replaceChild(newDOM, this.placeholder);

    /* 处理 space element */
    if (newDOM.classList.contains('space')) {
      if (newDOM.classList.contains('space-horizontal')) {
        dropDOM.style.display = 'flex';
      }
    }

    this.handleListenerRemove();
  }

  handleDragEnter(e) {
    const self = this;
    e.stopPropagation();
    if (!this.dragDOM) return false;
    if (e.target === this.placeholder) return false;
    if (!e.target.classList.contains('demo') && e.target.className.indexOf('fan-col') < 0) return false;
    console.log('enter', e.target);
    this.over = e.target;

    this.over.appendChild(this.placeholder);
  }

  /* 兄弟元素 */
  handleSlibingDragEnter(e) {
    console.log('box enter', e.target);
    const self = this;
    e.stopPropagation();
    if (!e.currentTarget.classList.contains('box')) return false;
    const slibingDOM = e.currentTarget;
    const parent = slibingDOM.parentNode;

    const relY = e.clientY;
    const height = (slibingDOM.getBoundingClientRect().bottom + slibingDOM.getBoundingClientRect().top) * 0.5;
    if (relY > height) {
      console.log('1');
      parent.insertBefore(this.placeholder, slibingDOM.nextElementSibling);
    } else if (relY < height) {
      console.log('2');
      this.nodePlacement = 'before';
      parent.insertBefore(this.placeholder, slibingDOM);
    }
  }

  handleListenerRemove() {
    /* 移除事件、指针置空 */
    // this.containers && this.containers.forEach((item) => {
    //   item.removeEventListener('dragover', this.handleDragOver);
    //   item.removeEventListener('dragenter', this.handleDragEnter);
    //   item.removeEventListener('drop', this.handleDrop);
    // });

    // this.boxes && this.boxes.forEach((item) => {
    //   item.removeEventListener('dragenter', this.handleSlibingDragEnter);
    // });
    this.dragDOM = null;
  }
  /* drag end */

  /* 为界面元素绑定 */
  handleEventBind(node) {
    const self = this;
    node.addEventListener('dragstart', this.handleDragStart);
    node.addEventListener('click', this.handleBoxClick);
  }

  /* 移除当前元素 */
  handleRemove(e) {
    const self = this;
    const dom = e.target.parentNode;

    /* 移除 父元素 display: flex */
    if (dom.classList.contains('space-horizontal')) {
      let horizontalLen = 0;
      dom.parentNode.childNodes.forEach((item) => {
        if (item.classList.contains('space-horizontal')) {
          horizontalLen += 1;
        }
      });
      if (horizontalLen === 1) {
        dom.parentNode.style.display = 'block';
      }
    }
    dom.removeEventListener('click', this.handleBoxClick);
    dom.parentNode.removeChild(dom);
  }

  /* 切换 border */
  handleToggleBoder(e) {
    const self = this;
    const dom = e.target.parentNode;
    const optDOM = e.target.parentNode.querySelector('.view').firstChild;
    optDOM.classList.toggle('border');
  }

  handleSpaceResize(node, size) {
    const self = this;
    let str = '';
    switch (size) {
      case 'small':
        str = '8px';
        break;
      case 'middle':
        str = '16px';
        break;
      case 'large':
        str = '24px';
        break;
      default: str = size || 'none'; break;

    }

    if (node.classList.contains('space-horizontal')) {
      node.style.maxWidth = str;
    } else if (node.classList.contains('space-vertical')) {
      node.style.height = str;
    }
  }

  /* event delegate */
  handleBoxClick(e) {
    e.stopPropagation();
    if (e.target.classList.contains('opt-remove')) {
      this.handleRemove(e);
      return false;
    }
    if (e.target.classList.contains('opt-border')) {
      this.handleToggleBoder(e);
      return false;
    }
    if (e.target.classList.contains('opt-small')) {
      this.handleSpaceResize(e.currentTarget, 'small');
      return false;
    }
    if (e.target.classList.contains('opt-large')) {
      this.handleSpaceResize(e.currentTarget, 'large');
      return false;
    }
    if (e.target.classList.contains('opt-middle')) {
      this.handleSpaceResize(e.currentTarget, 'middle');
      return false;
    }
    if (e.target.classList.contains('opt-adapt')) {
      this.handleSpaceResize(e.currentTarget, 'adapt');
      return false;
    }

    let selectDOM = e.currentTarget;
    if (e.target.className.indexOf('fan-col') > -1) {
      selectDOM = e.target;
    }

    Action.updatePage({ selectDOM });
  }
}

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
