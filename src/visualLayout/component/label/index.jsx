import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  editable: PropTypes.bool,
  text: PropTypes.string
};

const defaultProps = {
  editable: false,
  text: 'label'
};

class Label extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { editable, text } = this.props;
    console.log(text);
    return (
      <label htmlFor="label" contentEditable={editable}>{text}</label>
    );
  }

  componentDidMount() {}

}

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;

export default Label;
