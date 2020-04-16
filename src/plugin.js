import markerReplacer from './conditional-marker-replacer';
import modifyChildren from '../thirdparty-wrappers/unist-util-modify-children';

export default function () {
  const modify = modifyChildren(markerReplacer);

  return function transformer(node) {
    modify(node);
  };
}
