import modifyChildren from 'unist-util-modify-children';

import markerReplacer from './conditional-marker-replacer.js';

export default function () {
  const modify = modifyChildren(markerReplacer);

  return function transformer(node) {
    modify(node);
  };
}
