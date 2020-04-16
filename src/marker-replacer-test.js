import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import * as partOfNodeGroupPredicate from './predicates/node-is-part-of-badge-group';
import replaceMarkerWithZone from './marker-replacer';

suite('marker replacer', () => {
  let sandbox;
  const originalParentChildren = any.listOf(any.simpleObject);
  const badgeGroupType = any.word();
  const paragraphChildren = any.listOf(any.simpleObject);

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(partOfNodeGroupPredicate, 'default');
  });

  teardown(() => sandbox.restore());

  test('that the marker node is replaced with a zone in the parent node\'s children', () => {
    const parentChildren = [...originalParentChildren];
    const nodeIndex = any.integer({max: parentChildren.length});

    assert.equal(
      replaceMarkerWithZone(
        {children: parentChildren},
        nodeIndex,
        badgeGroupType
      ),
      nodeIndex + 1
    );
    assert.deepEqual(
      parentChildren,
      [
        ...originalParentChildren.slice(0, nodeIndex),
        {type: 'html', value: `<!--${badgeGroupType}-badges start -->`},
        {type: 'html', value: `<!--${badgeGroupType}-badges end -->`},
        ...originalParentChildren.slice(nodeIndex + 1)
      ]
    );
  });

  test('that existing badges are included in the created zone', () => {
    const badgeGroup = {...any.simpleObject(), type: 'paragraph', children: paragraphChildren};
    const nodeIndex = any.integer({max: originalParentChildren.length});
    const parentChildren = [
      ...originalParentChildren.slice(0, nodeIndex + 1),
      badgeGroup,
      ...originalParentChildren.slice(nodeIndex + 1)
    ];
    paragraphChildren.forEach(child => {
      partOfNodeGroupPredicate.default.withArgs(child).returns(true);
    });

    assert.equal(
      replaceMarkerWithZone(
        {children: parentChildren},
        nodeIndex,
        badgeGroupType
      ),
      nodeIndex + 2
    );
    assert.deepEqual(
      parentChildren,
      [
        ...originalParentChildren.slice(0, nodeIndex),
        {type: 'html', value: `<!--${badgeGroupType}-badges start -->`},
        badgeGroup,
        {type: 'html', value: `<!--${badgeGroupType}-badges end -->`},
        ...originalParentChildren.slice(nodeIndex + 1)
      ]
    );
  });

  test('that content after the marker is not included in the zone if there are no existing badges', () => {
    const nodeIndex = any.integer({max: originalParentChildren.length});
    const paragraph = {type: 'paragraph', children: paragraphChildren};
    const parentChildren = [
      ...originalParentChildren.slice(0, nodeIndex + 1),
      paragraph,
      ...originalParentChildren.slice(nodeIndex + 1)
    ];
    paragraphChildren.forEach(child => {
      partOfNodeGroupPredicate.default.withArgs(child).returns(false);
    });

    assert.equal(
      replaceMarkerWithZone(
        {children: parentChildren},
        nodeIndex,
        badgeGroupType
      ),
      nodeIndex + 1
    );
    assert.deepEqual(
      parentChildren,
      [
        ...originalParentChildren.slice(0, nodeIndex),
        {type: 'html', value: `<!--${badgeGroupType}-badges start -->`},
        {type: 'html', value: `<!--${badgeGroupType}-badges end -->`},
        paragraph,
        ...originalParentChildren.slice(nodeIndex + 1)
      ]
    );
  });
});
