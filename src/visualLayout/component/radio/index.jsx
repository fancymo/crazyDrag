import React, { Component } from 'react';
import Label from './label';

const CLASS_PREFIX = 'fan-';
const RADIO_CLASS = `${CLASS_PREFIX}radio`;

const propTypes = {

};

const defaultProps = {

};

class Radio extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <span className={RADIO_CLASS}>
        <input type="radio" />
        <Label />
      </span>);
  }

  componentDidMount() {}

}

export default Radio;
