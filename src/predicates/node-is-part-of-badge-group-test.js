import sinon from 'sinon';
import any from '@travi/any';
import {assert} from 'chai';
import * as lineBreakPredicate from './node-is-line-break';
import isNodePartOfBadgeGroup from './node-is-part-of-badge-group';

suite('part of badge group', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(lineBreakPredicate, 'default');
  });

  teardown(() => sandbox.restore());

  test('that `true` is returned if the node is a line-break', () => {
    const node = any.simpleObject();
    lineBreakPredicate.default.withArgs(node).returns(true);

    assert.isTrue(isNodePartOfBadgeGroup(node));
  });

  test('that `true` is returned if the node is a link', () => {
    lineBreakPredicate.default.returns(false);

    assert.isTrue(isNodePartOfBadgeGroup({type: 'link'}));
  });

  test('that `true` is returned if the node is a link reference', () => {
    lineBreakPredicate.default.returns(false);

    assert.isTrue(isNodePartOfBadgeGroup({type: 'linkReference'}));
  });

  test('that `true` is returned if the node is an image', () => {
    lineBreakPredicate.default.returns(false);

    assert.isTrue(isNodePartOfBadgeGroup({type: 'image'}));
  });

  test('that `true` is returned if the node is an image reference', () => {
    lineBreakPredicate.default.returns(false);

    assert.isTrue(isNodePartOfBadgeGroup({type: 'imageReference'}));
  });

  test('that `false` is returned if node is not part of a badge group', () => {
    lineBreakPredicate.default.returns(false);

    assert.isFalse(isNodePartOfBadgeGroup({type: any.word()}));
  });
});
