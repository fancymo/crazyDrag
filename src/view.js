import React, { PropTypes } from 'react';

const propTypes = {};

const defaultProps = {};

class View extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="foo">
        Bar
      </div>
    );
  }
}

View.propTypes = propTypes;
View.defaultProps = defaultProps;

export default Foo;
