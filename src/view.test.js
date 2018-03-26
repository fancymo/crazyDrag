import React from 'react';
import { shallow, mount, render } from 'enzyme';

import View from './view.js';
console.log(shallow);

describe('A suite', function() {
  it('should render without throwing an error', function() {
    // expect(shallow(<View />).contains(<div className="foo">Bar</div>)).toBe(true);
  });

  it('should be selectable by class "foo"', function() {
    // expect(shallow(<View />).is('.foo')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    // expect(mount(<View />).find('.foo').length).toBe(1);
  });

  it('should render to static HTML', function() {
    // expect(render(<View />).text()).toEqual('Bar');
  });
});
