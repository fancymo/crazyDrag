import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { Dropdown, Radio, Button } from 'antd';

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
      'handleDragOver',
      'handleDrop',
      'handleSlibingDragOver',
      'handleDragEnter',
      'handleDragLeave',
      'handleEventBind',
      'handleBoxClick'
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
        <span className="opt-remove" onClick={this.handleRemove}>删除</span>
        { border && <span className="opt-border" onClick={this.handleToggleBoder}>边框</span> }
        { mode && <div className="pseudo-element" /> }
        {
          mode && (
            <div className="size-group">
              { mode === 'horizontal' && <span className="opt-adapt" onClick={this.handleRemove}>撑开</span> }
              <span className="opt-large" onClick={this.handleRemove}>大</span>
              <span className="opt-middle" onClick={this.handleRemove}>中</span>
              <span className="opt-small" onClick={this.handleRemove}>小</span>
            </div>
          )
        }
        <div className="preview">{preview}</div>
        <div className="view">{children}</div>
      </div>);
  }

  componentDidMount() {
    this.box.addEventListener('dragstart', this.handleDragStart);

    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    this.placeholder = placeholder;

    this.boxes = document.querySelectorAll('#container .box');
  }

  /* drag start */
  handleDragStart(e) {
    this.dragDOM = e.target;
    e.dataTransfer.effectAllowed = 'copy';

    this.placeholder.style.height = `${this.dragDOM.offsetHeight}px`;
    this.placeholder.style.width = `${this.dragDOM.offsetWidth}px`;
    this.containers = document.querySelectorAll('#container .demo, .layout-container div[class^=fan-col]');

    this.containers && this.containers.forEach((item) => {
      item.addEventListener('dragover', this.handleDragOver);
      item.addEventListener('drop', this.handleDrop);
      item.addEventListener('dragenter', this.handleDragEnter);
      item.addEventListener('dragleave', this.handleDragLeave);
    });

    this.boxes && this.boxes.forEach((item) => {
      item.addEventListener('dragover', this.handleSlibingDragOver);
    });
  }

  handleDragOver(e) {
    const self = this;
    e.preventDefault();
  }

  handleDrop(e) {
    const self = this;
    const dropDOM = e.currentTarget;
    const newDOM = this.dragDOM.cloneNode(true);
    this.handleEventBind(newDOM);
    this.placeholder && dropDOM.replaceChild(newDOM, this.placeholder);

    /* 处理 space element */
    if (newDOM.classList.contains('space')) {
      if (newDOM.classList.contains('space-horizontal')) {
        dropDOM.style.display = 'flex';
      }
    }

    /* 移除事件、指针置空 */
    this.containers && this.containers.forEach((item) => {
      item.removeEventListener('dragover', this.handleDragOver);
      item.removeEventListener('dragenter', this.handleDragEnter);
      item.removeEventListener('drop', this.handleDrop);
      item.removeEventListener('dragleave', this.handleDragLeave);
    });

    this.boxes && this.boxes.forEach((item) => {
      item.removeEventListener('dragover', this.handleSlibingDragOver);
    });
    this.dragDOM = null;
  }

  handleDragEnter(e) {
    const self = this;
    e.stopPropagation();
    if (!this.dragDOM) return false;
    if (e.target === this.placeholder) return false;
    this.over = e.currentTarget;
    this.over.appendChild(this.placeholder);
  }

  handleDragLeave(e) {
    const self = this;
    if (e.target === this.over && this.placeholder.parentNode) {
      this.placeholder.parentNode.removeChild(this.placeholder);
    }
  }

  /* 兄弟元素 */
  handleSlibingDragOver(e) {
    const self = this;
    e.preventDefault();  // 允许响应 drop event
    e.stopPropagation();
    const slibingDOM = e.currentTarget;
    const parent = this.over;
    const relY = e.clientY;
    const height = (slibingDOM.getBoundingClientRect().bottom + slibingDOM.getBoundingClientRect().top) * 0.5;
    if (relY > height) {
      parent.insertBefore(this.placeholder, slibingDOM.nextElementSibling);
    } else if (relY < height) {
      this.nodePlacement = 'before';
      parent.insertBefore(this.placeholder, slibingDOM);
    }
  }
  /* drag end */

  /* 为界面元素绑定 */
  handleEventBind(node) {
    const self = this;
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
    // node.parentNode.style.display = 'block';
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
      default: str = 'none'; break;

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
    }
    if (e.target.classList.contains('opt-border')) {
      this.handleToggleBoder(e);
    }

    if (e.target.classList.contains('opt-small')) {
      this.handleSpaceResize(e.currentTarget, 'small');
    }
    if (e.target.classList.contains('opt-large')) {
      this.handleSpaceResize(e.currentTarget, 'large');
    }
    if (e.target.classList.contains('opt-middle')) {
      this.handleSpaceResize(e.currentTarget, 'middle');
    }
    if (e.target.classList.contains('opt-adapt')) {
      this.handleSpaceResize(e.currentTarget, 'adapt');
    }
  }
}

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
