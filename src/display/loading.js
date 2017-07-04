
export default function functionName() {
  // 初始隐藏 被控制的 输入框
  document.querySelectorAll('.demo input[data-control]').forEach((item) => {
    const controlname = item.dataset.control;
    const controlDOM = document.querySelector(`.demo input[name='${controlname}']`);
    // 如果 radio / checkbox 不是选中状态， 则隐藏其控制的元素
    if (!controlDOM.checked) {
      item.style.display = 'none';
    }
  });

  // 全局监听事件
  document.querySelector('.demo').addEventListener('click', (e) => {
    // 单选框
    if (e.target.nodeName === 'INPUT' && e.target.type === 'radio') {
      const groupname = e.target.dataset.group;
      const name = e.target.name;
      const radios = e.currentTarget.querySelectorAll(`input[data-group='${groupname}']`);
      radios.forEach((item) => {
        if (item !== e.target) {
          item.checked = false;
          document.querySelectorAll(`input[data-control='${item.name}']`).forEach((inputItem) => {
            inputItem.style.display = 'none';
          });
        } else {
          const controlledDOM = document.querySelector(`input[data-control='${name}']`);
          if (controlledDOM) {
            controlledDOM.style.display = 'initial';
          }
        }
      });
    }

    if (e.target.nodeName === 'INPUT' && e.target.type === 'checkbox') {
      const name = e.target.name;
      const checked = e.target.checked;
      const controlledDOM = document.querySelector(`input[data-control='${name}']`);
      if (controlledDOM) {
        document.querySelector(`input[data-control='${name}']`).style.display = checked ? 'initial' : 'none';
      }
    }
  });
}
