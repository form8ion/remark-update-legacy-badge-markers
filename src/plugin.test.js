import modifyChildren from 'unist-util-modify-children';

import {afterEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import markerUpgrader from './conditional-marker-replacer';
import plugin from './plugin';

vi.mock('unist-util-modify-children');

describe('plugin', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should replace legacy markers with modern zones', () => {
    const node = any.simpleObject();
    const modify = vi.fn();
    when(modifyChildren).calledWith(markerUpgrader).mockReturnValue(modify);

    plugin()(node);

    expect(modify).toHaveBeenCalledWith(node);
  });
});
