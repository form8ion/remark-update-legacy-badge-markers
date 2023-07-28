import {afterEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import isLineBreak from './node-is-line-break.js';
import isNodePartOfBadgeGroup from './node-is-part-of-badge-group.js';

vi.mock('./node-is-line-break');

describe('part of badge group', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return `true` if the node is a line-break', () => {
    const node = any.simpleObject();
    when(isLineBreak).calledWith(node).mockReturnValue(true);

    expect(isNodePartOfBadgeGroup(node)).toBe(true);
  });

  it('should return `true` if the node is a link', () => {
    isLineBreak.mockReturnValue(false);

    expect(isNodePartOfBadgeGroup({type: 'link'})).toBe(true);
  });

  it('should return `true` if the node is a link-reference', () => {
    isLineBreak.mockReturnValue(false);

    expect(isNodePartOfBadgeGroup({type: 'linkReference'})).toBe(true);
  });

  it('should return `true` if the node is an image', () => {
    isLineBreak.mockReturnValue(false);

    expect(isNodePartOfBadgeGroup({type: 'image'})).toBe(true);
  });

  it('should return `true` if the node is an image-reference', () => {
    isLineBreak.mockReturnValue(false);

    expect(isNodePartOfBadgeGroup({type: 'imageReference'})).toBe(true);
  });

  it('should return `false` if the node is not part of a badge group', () => {
    isLineBreak.mockReturnValue(false);

    expect(isNodePartOfBadgeGroup({type: any.word()})).toBe(false);
  });
});
