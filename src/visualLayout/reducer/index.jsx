import { combineReducers } from 'redux';

const row = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ROW': return { ...state, ...action.data };
    default: return state;
  }
};

const pageStateInit = {
  editable: true,
  codeModal: {
    visiable: false,
    data: null
  }
};

const page = (state = pageStateInit, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE': return { ...state, ...action.data };
    default: return state;
  }
};

const Reducer = combineReducers({ page, row });
export default Reducer;
