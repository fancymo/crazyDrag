import React, { Component } from 'react';
import { Input } from 'antd';

const propTypes = {

};

const defaultProps = {

};

class CInput extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (<Input className="input" style={{ width: '70px' }} />);
  }

  componentDidMount() {}

}

export default CInput;
