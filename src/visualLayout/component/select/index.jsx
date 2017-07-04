import React, { Component } from 'react';
import Label from '../label';

import './index.less';

const CLASS_PREFIX = 'fan-';
const SELECT_CLASS = `${CLASS_PREFIX}select`;

const propTypes = {

};

const defaultProps = {

};

class Select extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <select className={SELECT_CLASS} />);
  }

  componentDidMount() {}

}

export default Select;
