export default function (node, index, parent) {
  if ('html' === node.type) {
    const match = node.value.match(/^<!-- (status|consumer|contribution) badges -->$/);

    if (match) {
      const badgeGroupType = match[1];

      parent.children.splice(
        index,
        1,
        {type: 'html', value: `<!--${badgeGroupType}-badges start -->`},
        {type: 'html', value: `<!--${badgeGroupType}-badges end -->`}
      );

      return index + 1;
    }
  }

  return undefined;
}
