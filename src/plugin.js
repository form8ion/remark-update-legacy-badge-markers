import modifyChildren from 'unist-util-modify-children';

import markerReplacer from './conditional-marker-replacer';

export default function () {
  const modify = modifyChildren(markerReplacer);

  return function transformer(node) {
    modify(node);
  };
}
