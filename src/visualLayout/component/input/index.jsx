import React, { Component } from 'react';

const propTypes = {

};

const defaultProps = {

};

class Input extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div>
        <input className="input" style={{ width: '70px' }} />
      </div>);
  }

  componentDidMount() {}

}

export default Input;
