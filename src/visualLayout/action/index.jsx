import Store from '../store';

const Action = {
  /* 定义列表表头过滤 */
  updatePage(data) {
    Store.dispatch({ type: 'UPDATE_PAGE', data });
  }
};

export default Action;
