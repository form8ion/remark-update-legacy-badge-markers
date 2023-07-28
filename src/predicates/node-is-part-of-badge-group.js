import nodeIsLineBreak from './node-is-line-break.js';

export default function nodeIsPartOfBadgeGroup(node) {
  return ['image', 'imageReference', 'link', 'linkReference'].includes(node.type) || nodeIsLineBreak(node);
}
