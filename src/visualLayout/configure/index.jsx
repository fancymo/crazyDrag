import React, { Component } from 'react';
import { Input, TreeSelect, Dropdown, Menu, Switch } from 'antd';
import Store from '../store';
import Action from '../action';

import './index.less';

const COMPONENT_VALUE = 'value';
const COMPONENT_NAME = 'name';
const COMPONENT_PLACEHOLDER = 'placeholder';
const COMPONENT_HIDE_LABEL = 'hideLabel';

export default class Configure extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
    [
      'handleStateChange',
      'handleInputBlur',
      'handleInputChange',
      'handleTreeChange',
      'handleSwitchChange'
    ].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  render() {
    const { isSelect, name, placeholder, value, hideLabel, inputType } = this.state;
    return (
      <div id="configure" className="layout-configure">
        { !isSelect && '(未选择组件～)' }
        {
          isSelect && (
            <div>
              <div className="withLabel" data-label="name:">
                <TreeSelect
                  style={{ width: 170 }}
                  value={this.state.name}
                  treeData={this.state.groupData}
                  placeholder="Please select"
                  treeDefaultExpandAll
                  onChange={this.handleTreeChange}
                />
              </div>
              {
                inputType === 'text' && (
                  <div className="withLabel" data-label="placeholder:">
                    <Input value={placeholder || ''} onChange={e => this.handleInputChange(e, COMPONENT_PLACEHOLDER)} onBlur={e => this.handleInputBlur(e, COMPONENT_PLACEHOLDER)} placeholder="placeholder" />
                  </div>
                )
              }
              {
                inputType && (
                  <div className="withLabel" data-label="value:">
                    <Input value={value || ''} onChange={e => this.handleInputChange(e, COMPONENT_VALUE)} onBlur={e => this.handleInputBlur(e, COMPONENT_VALUE)} placeholder="value" />
                  </div>
                )
              }
              {
                ['radio', 'checkbox'].indexOf(inputType) > -1 && (
                  <div className="withLabel" data-label="Is display label:">
                    <Switch checked={hideLabel} onChange={this.handleSwitchChange} />
                  </div>
                )
              }
            </div>
          )
        }
    </div>);
  }

  componentDidMount() {
    this.unsubscribe = Store.subscribe(this.handleStateChange);

    fetch('data-group/list', {
      method: 'GET',
      qs: { pagenum: 1, pagesize: 1, code: 'datagroup_code1' },
    }).then((json) => {
      const loopData = (data) => {
        if (!data) return null;
        const arr = data.map((item) => {
          return {
            label: item.title,
            key: item.id || item._id,
            value: item.id || item._id,
            children: loopData(item.items)
          };
        });
        return arr;
      };
      this.setState({ groupData: loopData(json.data) || [] });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleStateChange() {
    const selectDOM = Store.getState().page.selectDOM;
    let child;
    if (!selectDOM) return false;
    if (selectDOM.className.indexOf('fan-col') > -1) {
      child = selectDOM;
    } else {
      child = selectDOM.querySelector('.view input') || selectDOM.querySelector('.view').firstChild;
    }
    this.setState({
      isSelect: !!selectDOM,
      name: child.getAttribute(COMPONENT_NAME),
      placeholder: child.type && child.getAttribute(COMPONENT_PLACEHOLDER),
      value: child.type && child.getAttribute(COMPONENT_VALUE),
      inputType: child.type,
      hideLabel: child.nextSibling && child.nextSibling.style.display === 'none'
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
    let child;
    if (!selectDOM) return false;
    if (selectDOM.className.indexOf('fan-col') > -1) {
      child = selectDOM;
    } else {
      child = selectDOM.querySelector('.view input') || selectDOM.querySelector('.view').firstChild;
    }
    const value = e.target.value;
    switch (name) {
      case COMPONENT_NAME:
        child.setAttribute(COMPONENT_NAME, value);
        child.setAttribute('title', value);
        break;
      case COMPONENT_PLACEHOLDER:
        child.setAttribute(COMPONENT_PLACEHOLDER, value);
        break;
      case COMPONENT_VALUE:
        child.setAttribute(COMPONENT_VALUE, value);
        if (child.nextSibling && child.nodeName === 'LABEL') {
          child.nextSibling.innerText = value;
        }
        break;
      default: break;
    }
  }

  handleTreeChange(value) {
    const self = this;
    const selectDOM = Store.getState().page.selectDOM;
    let child;
    if (!selectDOM) return false;
    if (selectDOM.className.indexOf('fan-col') > -1) {
      child = selectDOM;
    } else {
      child = selectDOM.querySelector('.view input') || selectDOM.querySelector('.view').firstChild;
    }
    child.setAttribute(COMPONENT_NAME, value);
    child.setAttribute('title', value);
    this.setState({ name: value });
  }

  handleSwitchChange(value) {
    const self = this;
    const selectDOM = Store.getState().page.selectDOM;
    let child;
    if (!selectDOM) return false;
    if (selectDOM.className.indexOf('fan-col') > -1) {
      child = selectDOM;
    } else {
      child = selectDOM.querySelector('.view input') || selectDOM.querySelector('.view').firstChild;
    }
    child.nextSibling.style.display = value ? 'none' : 'inline-block';
    this.setState({ hideLabel: value });
  }
}
