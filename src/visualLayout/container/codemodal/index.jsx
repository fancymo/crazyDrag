import React, { Component } from 'react';
import { Modal, Switch } from 'antd';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/xml/xml';

const propTypes = {

};

const defaultProps = {

};

function loopCheckout(json) {
  const dom = json.elem;
  json.children && json.children.forEach((item) => {
    dom.appendChild(loopCheckout(item));
  });
  return dom;
}

class CodeModal extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      code: true
    };
    [
      'handleLoadView',
      'handleSwitchChange'
    ].forEach((m) => {
      this[m] = this[m].bind(this);
    });
  }

  render() {
    const { page } = this.props;
    const { codeModal } = page;
    return (
      <Modal title="下载模版" visible={codeModal.visible} onOk={this.props.onOk} onCancel={this.props.onCancel} width="80%">
        <div>
          <label htmlFor="switch">代码模式: </label><Switch checked={this.state.code} onChange={this.handleSwitchChange} checkedChildren={'开'} unCheckedChildren={'关'} />
        </div>
        <div className="codebox" />
      </Modal>
    );
  }

  componentDidMount() {
    this.handleLoadView();
  }

  componentDidUpdate() {
    this.handleLoadView();
  }

  handleSwitchChange(checked) {
    this.setState({ code: checked });
  }

  // 加载界面数据
  handleLoadView() {
    const codeModal = this.props.page.codeModal;
    const codeBox = document.getElementsByClassName('codebox')[0];
    let code;
    if (codeModal.data && codeModal.visible) {
      code = codeModal.data && loopCheckout(codeModal.data);

      if (this.state.code) {  // code
        const domFrag = document.createElement('div');
        domFrag.appendChild(code);
        if (!this.codeMirrorDOM) {
          const div = document.createElement('div');
          codeBox.parentNode.insertBefore(div, codeBox);
          this.codeMirrorDOM = CodeMirror(div, {
            value: domFrag.innerHTML,
            lineNumbers: true,
            smartIndent: true,
            tabSize: 2,
            lineSeparator: null,
            autoFocus: true,
            mode: {
              name: 'htmlmixed',
              scriptTypes: [
                {
                  matches: /\/x-handlebars-template|\/x-mustache/i,
                  mode: null
                }]
            }
          });
        } else {
          // setTimeout(() => {
          this.codeMirrorDOM.setValue(domFrag.innerHTML);
          // this.codeMirrorDOM.display.input.focus();
          // }, 0);
        }
      } else {  // view
        if (codeBox.childNodes.length) {
          codeBox.replaceChild(code, codeBox.firstChild);
        } else {
          codeBox.appendChild(code);
        }
      }
    }
  }

}

export default CodeModal;
