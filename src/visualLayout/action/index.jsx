import Store from '../store';

const Action = {
  /* 定义列表表头过滤 */
  columnAddFilter(data) {
    Store.dispatch({ type: 'COLUMN_ADD_FILTER', data });
  }
};

export default Action;
