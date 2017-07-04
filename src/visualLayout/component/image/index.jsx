import React, { Component } from 'react';
import Label from '../label';
import ImgBase64 from './default';

import './index.less';

const CLASS_PREFIX = 'fan-';
const IMAGE_CLASS = `${CLASS_PREFIX}image`;

const propTypes = {
};

const defaultProps = {

};

class Image extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { ...rest } = this.props;
    return (
      <img className={IMAGE_CLASS} alt="default" src={ImgBase64} {...rest} />);
  }

  componentDidMount() {}

}

export default Image;
