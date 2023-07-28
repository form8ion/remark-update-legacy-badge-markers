import {afterEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import isPartOfNodeGroupPredicate from './predicates/node-is-part-of-badge-group.js';
import replaceMarkerWithZone from './marker-replacer.js';

vi.mock('./predicates/node-is-part-of-badge-group');

describe('marker replacer', () => {
  const originalParentChildren = any.listOf(any.simpleObject);
  const badgeGroupType = any.word();
  const paragraphChildren = any.listOf(any.simpleObject);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should replace the marker node with a zone in the parent nodes children', () => {
    const parentChildren = [...originalParentChildren];
    const nodeIndex = any.integer({max: parentChildren.length});

    expect(replaceMarkerWithZone(
      {children: parentChildren},
      nodeIndex,
      badgeGroupType
    )).toEqual(nodeIndex + 1);
    expect(parentChildren).toEqual([
      ...originalParentChildren.slice(0, nodeIndex),
      {type: 'html', value: `<!--${badgeGroupType}-badges start -->`},
      {type: 'html', value: `<!--${badgeGroupType}-badges end -->`},
      ...originalParentChildren.slice(nodeIndex + 1)
    ]);
  });

  it('should include existing badges in the created group', () => {
    const badgeGroup = {...any.simpleObject(), type: 'paragraph', children: paragraphChildren};
    const nodeIndex = any.integer({max: originalParentChildren.length - 1});
    const parentChildren = [
      ...originalParentChildren.slice(0, nodeIndex + 1),
      badgeGroup,
      ...originalParentChildren.slice(nodeIndex + 1)
    ];
    paragraphChildren.forEach((child, index) => {
      when(isPartOfNodeGroupPredicate).calledWith(child, index, paragraphChildren).mockReturnValue(true);
    });

    expect(replaceMarkerWithZone(
      {children: parentChildren},
      nodeIndex,
      badgeGroupType
    )).toEqual(nodeIndex + 2);
    expect(parentChildren).toEqual([
      ...originalParentChildren.slice(0, nodeIndex),
      {type: 'html', value: `<!--${badgeGroupType}-badges start -->`},
      badgeGroup,
      {type: 'html', value: `<!--${badgeGroupType}-badges end -->`},
      ...originalParentChildren.slice(nodeIndex + 1)
    ]);
  });

  it('should not include content after the marker in the zone if there are no existing badges', () => {
    const nodeIndex = any.integer({max: originalParentChildren.length - 1});
    const paragraph = {type: 'paragraph', children: paragraphChildren};
    const parentChildren = [
      ...originalParentChildren.slice(0, nodeIndex + 1),
      paragraph,
      ...originalParentChildren.slice(nodeIndex + 1)
    ];
    paragraphChildren.forEach((child, index) => {
      when(isPartOfNodeGroupPredicate).calledWith(child, index, paragraphChildren).mockReturnValue(false);
    });

    expect(replaceMarkerWithZone(
      {children: parentChildren},
      nodeIndex,
      badgeGroupType
    )).toEqual(nodeIndex + 1);
    expect(parentChildren).toEqual([
      ...originalParentChildren.slice(0, nodeIndex),
      {type: 'html', value: `<!--${badgeGroupType}-badges start -->`},
      {type: 'html', value: `<!--${badgeGroupType}-badges end -->`},
      paragraph,
      ...originalParentChildren.slice(nodeIndex + 1)
    ]);
  });
});
