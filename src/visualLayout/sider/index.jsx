import React, { Component } from 'react';
import { Collapse } from 'antd';
import Box from '../box';
import Configure from '../configure';
import { Input, Label, Row, CheckBox, Radio } from '../component';
import BoxRow from './box-row';
import Action from '../action';
import Store from '../store';

export default class Sider extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <div id="sider" className="layout-sider">
        <Collapse defaultActiveKey={['1', '2', '3']}>
          <Collapse.Panel className="accordion-group" header="布局" key="1">
            <BoxRow defaultValue="6,6" />
            <BoxRow defaultValue="4,8" />
            <BoxRow defaultValue="3,9" />
          </Collapse.Panel>
          <Collapse.Panel className="accordion-group" header="组件" key="2">
            <Box inline preview="Label" ><Label editable /></Box>
            <Box inline preview="输入框" ><Input /></Box>
            <Box inline preview="复选框" ><CheckBox /></Box>
            <Box inline preview="单选框" ><Radio /></Box>
            <Box inline mode="horizontal" preview="水平间距" />
            <Box mode="vertical" preview="垂直间距" />
          </Collapse.Panel>
          <Collapse.Panel className="accordion-group" header="配置信息" key="3">
            <Configure />
          </Collapse.Panel>
        </Collapse>
      </div>);
  }

  componentDidMount() {}

}
