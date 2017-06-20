const counter = require('./counter');

test('counter', () => {
  expect(counter(0, { type: 'INCREMENT' })).toEqual(1);
  expect(counter(1, { type: 'DECREMENT' })).toEqual(0);
  expect(counter(undefined, {})).toEqual(0);
});
