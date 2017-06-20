import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Classnames from 'classnames';

import './index.less';

const CLASS_PREFIX = 'fan-';
const SORT_CLASS = `${CLASS_PREFIX}sort`;
const SORT_ITEM = `${SORT_CLASS}-item`;
const SORT_PLACEHOLDER = `${SORT_CLASS}-placeholder`;

const propTypes = {
  sortItems: PropTypes.array
};

const defaultProps = {
  sortItems: []
};

class Sort extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      sortItems: this.props.sortItems
    };

    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
  }

  componentDidMount() {
    const placeholder = document.createElement('div');
    placeholder.className = `${SORT_PLACEHOLDER} ${SORT_ITEM}`;
    this.placeholder = placeholder;
  }

  render() {
    const { className, sortItems, ...rest } = this.props;

    const classes = Classnames(className, SORT_CLASS);

    const listContent = this.state.sortItems.map((item, index) => {
      return <div className={SORT_ITEM} data-id={index} key={index} draggable="true" onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>{item}</div>;
    });

    const reactDOM = <div className={classes} onDragOver={this.handleDragOver} ref={(sort) => { this.sort = sort; }}>{listContent}</div>;

    return reactDOM;
  }

  handleDragStart(e) {
    this.dragDom = e.target;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
    this.placeholder.style.height = this.dragDom.offsetHeight;
    this.placeholder.style.width = this.dragDom.offsetWidth;
    this.placeholder.innerHTML = e.target.innerHTML;
  }

  handleDragEnd(e) {
    const sortItems = this.state.sortItems;
    // const from = Number(this.dragDom.dataset.id);
    // let to = Number(this.over.dataset.id);
    this.dragDom.style.display = 'block';
    this.dragDom.parentNode.removeChild(this.placeholder);

    // from: 0, to: 1 'before': to 为 0, 'after': to 为 1
    // from: 2, to: 1 'before': to 为 1, 'after': to 为 2
    // if (from < to) to -= 1;
    // if (this.nodePlacement === 'after') to += 1;

    // sortItems.splice(to, 0, sortItems.splice(from, 1)[0]);
    // sortItems.splice(to, 0, this.dragDom);
    // parent.insertBefore(this.dragDom, this.over);
    // this.setState({ sortItems });

    // 支持 input 组件重新渲染携带输入内容
    const parent = this.sort;
    if (this.nodePlacement === 'before') {
      parent.insertBefore(this.dragDom, this.over);
    } else if (this.nodePlacement === 'after') {
      parent.insertBefore(this.dragDom, this.over.nextElementSibling);
    }
  }

  handleDragOver(e) {
    const parent = this.sort;
    e.preventDefault();  // allow drop
    this.dragDom.style.display = 'none';

    if (e.target.className.indexOf(SORT_PLACEHOLDER) !== -1) return false;
    if (e.target.className.indexOf(SORT_ITEM) === -1) return false;
    if (e.target === this.dragDom) {
      parent.insertBefore(this.placeholder, e.target.nextElementSibling);
      return false;
    }

    this.over = e.target;

    const relY = e.clientY - this.sort.getBoundingClientRect().top - this.over.offsetTop;
    const height = this.over.offsetHeight / 2;

    if (relY > height) {
      this.nodePlacement = 'after';
      parent.insertBefore(this.placeholder, e.target.nextElementSibling);
    } else if (relY < height) {
      this.nodePlacement = 'before';
      parent.insertBefore(this.placeholder, e.target);
    }
  }

}

Sort.propTypes = propTypes;
Sort.defaultProps = defaultProps;

export default Sort;
