import {afterEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import replaceMarker from './marker-replacer';
import conditionallyReplaceMarkers from './conditional-marker-replacer';

vi.mock('./marker-replacer');

describe('conditional marker replacer modifier', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should replace legacy markers with modern zones', () => {
    const nodeIndex = any.integer();
    const nextIndex = any.integer();
    const badgeGroupType = any.fromList(['status', 'consumer', 'contribution']);
    const parent = any.simpleObject();
    when(replaceMarker).calledWith(parent, nodeIndex, badgeGroupType).mockReturnValue(nextIndex);

    expect(conditionallyReplaceMarkers(
      {type: 'html', value: `<!-- ${badgeGroupType} badges -->`},
      nodeIndex,
      parent
    )).toEqual(nextIndex);
  });

  it('should not replace an unexpected zone', () => {
    expect(conditionallyReplaceMarkers(
      {type: 'html', value: `<!-- ${any.word()} badges -->`},
      any.integer(),
      any.simpleObject()
    )).toBe(undefined);
    expect(replaceMarker).not.toHaveBeenCalled();
  });

  it('should not modify non-html nodes', () => {
    expect(conditionallyReplaceMarkers({type: any.word()})).toBe(undefined);
    expect(replaceMarker).not.toHaveBeenCalled();
  });
});
