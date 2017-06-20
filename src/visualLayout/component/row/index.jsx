import React, { Component } from 'react';
import Classnames from 'classnames';

import './index.less';

const CLASS_PREFIX = 'fan-';
const ROW_CLASS = `${CLASS_PREFIX}row`;
const COL_CLASS = `${CLASS_PREFIX}col`;
const COL_OFFSET = `${COL_CLASS}-offset`;

const propTypes = {};

const defaultProps = {};

class Row extends Component {

  // constructor(props, context) {
  //   super(props, context);
  // }

  render() {
    const { className, children, ...rest } = this.props;

    const classes = Classnames(className, ROW_CLASS);

    const reactDOM = <div {...rest} className={classes}>{children}</div>;

    return reactDOM;
  }

}

Row.Col = function (props) {
  const { className, col, offset, children, ...rest } = props;

  const classes = Classnames(className, [`${COL_CLASS}-${parseInt(col, 10)}`],
    {
      [`${COL_OFFSET}-${parseInt(offset, 10)}`]: offset
    });
  const reactDom = <div {...rest} className={classes}>{children}</div>;
  return reactDom;
};

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
