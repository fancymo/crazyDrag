import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const propTypes = {
  preview: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]), // 展示的标题
  inline: PropTypes.bool  // 行内布局
};

const defaultProps = {
  preview: '标题',
  inline: false
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
      'handleEventBind'
    ].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  render() {
    const { preview, inline, children } = this.props;
    const cls = ClassNames('box', 'draggable', {
      inline
    });
    return (
      <div className={cls} draggable ref={(box) => { this.box = box; }}>
        <span className="opt-remove" onClick={this.handleRemove}>删除</span>
        <span className="opt-border" onClick={this.handleToggleBoder}>边框</span>
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

  handleEventBind(node) {
    node.querySelector('.opt-remove').addEventListener('click', this.handleRemove);
    node.querySelector('.opt-border').addEventListener('click', this.handleToggleBoder);
  }

  /* 移除 */
  handleRemove(e) {
    const self = this;
    const dom = e.target.parentNode;
    dom.parentNode.removeChild(dom);
  }

  handleToggleBoder(e) {
    const self = this;
    const dom = e.target.parentNode;
    const optDOM = e.target.parentNode.querySelector('.view').firstChild;
    optDOM.classList.toggle('border');
  }
}

Box.propTypes = propTypes;
Box.defaultProps = defaultProps;

export default Box;
