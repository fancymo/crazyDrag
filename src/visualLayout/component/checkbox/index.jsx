import React, { Component } from 'react';
import Label from '../label';

import './index.less';

const CLASS_PREFIX = 'fan-';
const CHECKBOX_CLASS = `${CLASS_PREFIX}checkbox`;

const propTypes = {

};

const defaultProps = {

};

class CheckBox extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <span className={CHECKBOX_CLASS}>
        <input type="checkbox" />
        <Label text="on" />
      </span>);
  }

  componentDidMount() {}

}

export default CheckBox;
