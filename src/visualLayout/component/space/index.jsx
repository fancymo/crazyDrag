import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const propTypes = {
  mode: PropTypes.oneOf(['horizontal', 'vertical'])
};

const defaultProps = {
  mode: 'horizontal'
};

class Space extends React.PureComponent {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { mode } = this.props;
    console.log(mode);
    const cls = ClassNames('space', `space-${mode}`);
    return (
      <div className={cls} />
    );
  }

  componentDidMount() {}

}

Space.propTypes = propTypes;
Space.defaultProps = defaultProps;

export default Space;
