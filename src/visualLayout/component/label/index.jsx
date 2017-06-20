import React, { Component } from 'react';

const propTypes = {

};

const defaultProps = {

};

class Label extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <label htmlFor="label" contentEditable>label</label>
    );
  }

  componentDidMount() {}

}

export default Label;
