function counter (state = 0, action) {
  // if (typeof state === 'undefined') {
  //   return 0;
  // }
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
      break;
    case 'DECREMENT':
      return state - 1;
      break;
    default: return state;

  }
}

module.exports = counter;
