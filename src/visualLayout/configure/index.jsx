import React, { Component } from 'react';
import { Input, TreeSelect, Dropdown, Menu, Switch, Select } from 'antd';
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
      'handleSwitchChange',
      'handleSelectChange',
      'handleGroupTreeChange',
      'handleControlTreeChange'
    ].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  render() {
    const { isSelect, name, placeholder, value, hideLabel, inputType, isMultiSelect, selectOptions, isImage, height, width, groupname, groupcontrol, controlname } = this.state;
    const optionsArr = selectOptions && selectOptions.map((item) => {
      return <Select.Option value={item} key={item}>{item}</Select.Option>;
    });
    return (
      <div id="configure" className="layout-configure">
        { !isSelect && '(未选择组件～)' }
        {
          isSelect && (
            <div>
              <div className="withLabel" data-label="name:">
                <TreeSelect
                  style={{ width: 170 }}
                  value={name}
                  treeData={this.state.groupData}
                  placeholder="Please select"
                  treeDefaultExpandAll
                  onChange={this.handleTreeChange}
                />
              </div>
              {
                inputType === 'radio' && (
                  <div className="withLabel" data-label="groupname:">
                    <TreeSelect
                      style={{ width: 170 }}
                      value={groupname}
                      treeData={this.state.groupData}
                      placeholder="Please select"
                      treeDefaultExpandAll
                      onChange={this.handleGroupTreeChange}
                    />
                  </div>
                )
              }
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
                inputType === 'text' && (
                  <div className="withLabel" data-label="control:">
                    <TreeSelect
                      style={{ width: 170 }}
                      value={controlname || ''}
                      treeData={groupcontrol}
                      placeholder="Please select"
                      treeDefaultExpandAll
                      onChange={this.handleControlTreeChange}
                    />
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
              {
                isMultiSelect && (<div className="withLabel" data-label="options:">
                  <Select mode="tags" style={{ width: '100%' }} searchPlaceholder="输入下拉内容" onChange={this.handleSelectChange} />
                </div>)
              }
              {
                isMultiSelect && (<div className="withLabel" data-label="default option:">
                  <Select style={{ width: '100%' }} searchPlaceholder="选择默认选中选项" onChange={this.handleSelectDefaultChange}>
                    {optionsArr}
                  </Select>
                </div>)
              }
              {
                isImage && (<div className="withLabel" data-label="select image:">
                  <input type="file" onChange={this.handleImageChange} />
                </div>)
              }
              {
                isImage && (<div className="withLabel" data-label="width:">
                  <Input value={width || ''} type="number" onChange={e => this.handleInputChange(e, 'width')} onBlur={e => this.handleInputBlur(e, 'width')} placeholder="width" />
                </div>)
              }
              {
                isImage && (<div className="withLabel" data-label="height:">
                  <Input value={height || ''} type="number" onChange={e => this.handleInputChange(e, 'height')} onBlur={e => this.handleInputBlur(e, 'height')} placeholder="height" />
                </div>)
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
    const groupcontrol = [];
    if (!selectDOM) return false;
    if (selectDOM.className.indexOf('fan-col') > -1) {
      child = selectDOM;
    } else {
      child = selectDOM.querySelector('.view input') || selectDOM.querySelector('.view').firstChild;
    }
    if (child.type === 'text') {
      document.querySelectorAll('.demo input[type=radio],.demo input[type=checkbox]').forEach((item, index) => {
        groupcontrol.push({
          label: item.title,
          key: item.name + index,
          value: item.name
        });
      });
    }
    this.setState({
      isSelect: !!selectDOM,
      name: child.getAttribute(COMPONENT_NAME),
      placeholder: child.type && child.getAttribute(COMPONENT_PLACEHOLDER),
      value: child.type && child.getAttribute(COMPONENT_VALUE),
      inputType: child.type,
      hideLabel: child.nextSibling && child.nextSibling.style.display === 'none',
      isMultiSelect: child.nodeName === 'SELECT',   // 是否展示 options
      isImage: child.nodeName === 'IMG',
      height: child.style.height,    // 图片的高度
      width: child.style.width,      // 图片的宽度
      groupname: child.type === 'radio' && child.getAttribute('data-group'),  // 前端控制 radio 单选使用
      controlname: child.type === 'text' && child.getAttribute('data-control'), // 获取控制输入框的 组件
      groupcontrol,
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
      // case COMPONENT_NAME:
      //   child.setAttribute(COMPONENT_NAME, value);
      //   child.setAttribute('title', value);
      //   break;
      case COMPONENT_PLACEHOLDER:
        child.setAttribute(COMPONENT_PLACEHOLDER, value);
        break;
      case COMPONENT_VALUE:
        child.value = value;  // input 框的值
        child.setAttribute(COMPONENT_VALUE, value);
        child.setAttribute('defaultValue', value);
        if (child.nextSibling && child.nextSibling.nodeName === 'LABEL') {
          child.nextSibling.innerText = value;
        }
        break;
      case 'height':
        child.style.height = value ? `${value}px` : 'auto';
        break;
      case 'width':
        child.style.width = value ? `${value}px` : 'auto';
        break;
      default: break;
    }
  }

  handleTreeChange(value, select, extra) {
    const selectDOM = Store.getState().page.selectDOM;
    let child;
    if (!selectDOM) return false;
    if (selectDOM.className.indexOf('fan-col') > -1) {
      child = selectDOM;
    } else {
      child = selectDOM.querySelector('.view input') || selectDOM.querySelector('.view').firstChild;
    }
    child.setAttribute(COMPONENT_NAME, value);
    child.setAttribute('title', `${select[0]}${value}`);
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

  handleSelectChange(value) {
    const self = this;
    const selectDOM = Store.getState().page.selectDOM;
    const optDOM = selectDOM.querySelector('.view select');
    const htmlStr = value.map((item) => {
      return `<option value="${item}">${item}</option>`;
    });
    optDOM.innerHTML = htmlStr;
    this.setState({ selectOptions: value });
  }

  handleSelectDefaultChange(value) {
    const self = this;
    const selectDOM = Store.getState().page.selectDOM;
    const optDOM = selectDOM.querySelector('.view select');
    optDOM.setAttribute('defaultValue', value);
  }

  handleImageChange(e) {
    const self = this;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (oFREvent) => {
      const selectDOM = Store.getState().page.selectDOM;
      const optDOM = selectDOM.querySelector('.view img');
      optDOM.src = oFREvent.target.result;
    };
    reader.readAsDataURL(file);
  }

  // 为 单选框 指定所属 组
  handleGroupTreeChange(value) {
    const selectDOM = Store.getState().page.selectDOM;
    const child = selectDOM.querySelector('.view input');
    if (!selectDOM) return false;

    child.setAttribute('data-group', value);
    this.setState({ groupname: value });
  }

  // 为 输入框 指定控制显示隐藏的组件
  handleControlTreeChange(value) {
    const self = this;
    const selectDOM = Store.getState().page.selectDOM;
    const child = selectDOM.querySelector('.view input');
    child.setAttribute('data-control', value);
    this.setState({ controlname: value });
  }
}
