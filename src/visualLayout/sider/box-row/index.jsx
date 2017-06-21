import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import Box from '../../box';
import { Input, Label, Row } from '../../component';

const propTypes = {
  defaultValue: PropTypes.string
};

const defaultProps = {
  defaultValue: '6,6'
};

class BoxRow extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.defaultValue
    };

    [
      'handleBlur'
    ].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  render() {
    const { defaultValue } = this.props;
    const cols = this.state.value.split(',');
    const colRets = [];
    cols && cols.forEach((item, index) => {
      colRets.push(<Row.Col col={parseInt(item, 10)} key={index} />);
    });
    return (
      <Box preview={<input defaultValue={defaultValue} onBlur={this.handleBlur} />} border >
        <Row>{colRets}</Row>
      </Box>);
  }

  componentDidMount() {}

  handleBlur(e) {
    const self = this;
    const value = e.target.value;
    this.setState({ value });
  }

}

BoxRow.propTypes = propTypes;
BoxRow.defaultProps = defaultProps;

export default BoxRow;
