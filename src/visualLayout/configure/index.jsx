import React, { Component } from 'react';

export default class Configure extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div id="configure" className="layout-configure">
        <ul className="accordion-group">
          <li>配置栏</li>
          <li>mm</li>
        </ul>
      </div>);
  }

  componentDidMount() {}

}
