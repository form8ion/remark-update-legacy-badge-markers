import {assert} from 'chai';
import any from '@travi/any';
import replaceMarkerWithZone from './marker-replacer';

suite('marker replacer', () => {
  const originalParentChildren = any.listOf(any.simpleObject);
  const badgeGroupType = any.word();

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
    const badgeGroup = {...any.simpleObject(), type: 'paragraph'};
    const nodeIndex = any.integer({max: originalParentChildren.length});
    const parentChildren = [
      ...originalParentChildren.slice(0, nodeIndex + 1),
      badgeGroup,
      ...originalParentChildren.slice(nodeIndex + 1)
    ];

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
});
