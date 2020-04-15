import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import * as childrenModifier from '../thirdparty-wrappers/unist-util-modify-children';
import markerUpgrader from './marker-replacer';
import plugin from './plugin';

suite('plugin', () => {
  let sandbox;
  //
  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(childrenModifier, 'default');
  });

  teardown(() => sandbox.restore());

  test('that legacy markers are replaced by modern zones', () => {
    const node = any.simpleObject();
    const modify = sinon.spy();
    childrenModifier.default.withArgs(markerUpgrader).returns(modify);

    plugin()(node);

    assert.calledWith(modify, node);
  });
});
