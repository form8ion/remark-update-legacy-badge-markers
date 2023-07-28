import {describe, it, expect} from 'vitest';
import any from '@travi/any';

import nodeIsLineBreak from './node-is-line-break';

describe('line-break node', () => {
  it('should return `true` when the node is a line-break', () => {
    expect(nodeIsLineBreak({type: 'text', value: '\n'})).toBe(true);
  });

  it('should return `false` when the node is not a text node', () => {
    expect(nodeIsLineBreak({type: any.word()})).toBe(false);
  });

  it('should return `false` when the text node has a value that does not represent a line-break', () => {
    expect(nodeIsLineBreak({type: 'text'})).toBe(false);
  });
});
