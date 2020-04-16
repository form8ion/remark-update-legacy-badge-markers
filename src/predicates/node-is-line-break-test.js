import {assert} from 'chai';
import any from '@travi/any';
import nodeIsLineBreak from './node-is-line-break';

suite('line-break node', () => {
  test('that `true` is returned when the node is a line-break', () => {
    assert.isTrue(nodeIsLineBreak({type: 'text', value: '\n'}));
  });

  test('that `false` is returned when the node is not a text node', () => {
    assert.isFalse(nodeIsLineBreak({type: any.word()}));
  });

  test('that `false` is returned when the text node has a value that does not represent a line-break', () => {
    assert.isFalse(nodeIsLineBreak({type: 'text'}));
  });
});
