import replaceLegacyMakerWithZone from './marker-replacer';

export default function (node, index, parent) {
  if ('html' === node.type) {
    const match = node.value.match(/^<!-- (status|consumer|contribution) badges -->$/);

    if (match) {
      const [, badgeGroupType] = match;

      return replaceLegacyMakerWithZone(parent, index, badgeGroupType);
    }
  }

  return undefined;
}
