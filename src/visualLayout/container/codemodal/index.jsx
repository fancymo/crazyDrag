import React, { Component } from 'react';
import { Modal, Switch } from 'antd';
// import CodeMirror from 'codemirror';
import CodeMirror from 'react-codemirror';

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

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { page } = this.props;
    const { codeModal } = page;
    const options = {
      lineNumbers: true
    };
    const domFrag = document.createElement('div');
    let code = '';
    if (codeModal.data) {
      code = codeModal.data && loopCheckout(codeModal.data);
      domFrag.appendChild(code);
    }
    return (
      <Modal title="下载模版" visible={codeModal.visible} onOk={this.props.onOk} onCancel={this.props.onCancel} width="80%">
        <div>
          <label htmlFor="switch">代码模式: </label><Switch checked={this.state.code} onChange={this.handleSwitchChange} checkedChildren={'开'} unCheckedChildren={'关'} />
        </div>
        { this.state.code && <CodeMirror value={domFrag.innerHTML} options={options} /> }
        <div className="codebox" />
      </Modal>
    );
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    this.handleLoadView();
  }

  handleSwitchChange(checked) {
    this.setState({ code: checked });
  }

  handleLoadView() {
    if (this.state.code) return false;
    const codeBox = document.getElementsByClassName('codebox')[0];
    const codeModal = this.props.page.codeModal;
    let code;
    if (codeModal.data) {
      code = codeModal.data && loopCheckout(codeModal.data);
      code.classList.remove('edit');

      if (codeBox.childNodes.length) {
        codeBox.replaceChild(code, codeBox.firstChild);
      } else {
        codeBox.appendChild(code);
      }
    }
  }

}

export default CodeModal;
