import React, { Component } from 'react';
import { Input } from 'antd';
import Store from '../store';
import Action from '../action';

import './index.less';

export default class Configure extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
    [
      'handleStateChange',
      'handleInputBlur',
      'handleInputChange'
    ].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  render() {
    const { isSelect, name, placeholder, isInput } = this.state;
    return (
      <div id="configure" className="layout-configure">
        <ul className="accordion-group">
          <li>配置栏{ !isSelect && '(未选择组件～)' }</li>

          {
            isSelect && (
              <li>
                <div className="withLabel" data-label="name:">
                  <Input value={name || ''} onChange={e => this.handleInputChange(e, 'name')} onBlur={e => this.handleInputBlur(e, 'name')} placeholder="data name" />
                </div>
                {
                  isInput && (
                    <div className="withLabel" data-label="placeholder:">
                      <Input value={placeholder || ''} onChange={e => this.handleInputChange(e, 'placeholder')} onBlur={e => this.handleInputBlur(e, 'placeholder')} placeholder="placeholder" />
                    </div>
                  )
                }
              </li>
            )
          }
        </ul>
      </div>);
  }

  componentDidMount() {
    this.unsubscribe = Store.subscribe(this.handleStateChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleStateChange() {
    const selectDOM = Store.getState().page.selectDOM;
    if (!selectDOM) return false;
    const child = selectDOM.querySelector('input') || selectDOM.querySelector('.view').firstChild;
    this.setState({
      isSelect: !!selectDOM,
      name: child.getAttribute('data-name'),
      placeholder: child.type && child.getAttribute('placeholder'),
      isInput: child.type === 'text',
    });
  }

  handleInputChange(e, name) {
    this.setState({
      [name]: e.target.value
    });
  }

  handleInputBlur(e, name) {
    const self = this;
    const selectDOM = Store.getState().page.selectDOM;
    if (!selectDOM) return false;
    const child = selectDOM.querySelector('input') || selectDOM.querySelector('.view').firstChild;
    const value = e.target.value;
    switch (name) {
      case 'name':
        child.setAttribute('data-name', value);
        child.setAttribute('title', value);
        break;
      case 'placeholder':
        child.setAttribute('placeholder', value);
        break;
      default: break;
    }
  }

}
