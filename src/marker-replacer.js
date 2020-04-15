function nodeIsBadgeGroup(possibleBadgeGroupNode) {
  return possibleBadgeGroupNode && 'paragraph' === possibleBadgeGroupNode.type;
}

export default function replaceLegacyMakerWithZone(parent, index, badgeGroupType) {
  const nextNode = parent.children[index + 1];
  const existingBadgesArePresent = nodeIsBadgeGroup(nextNode);
  const modifiedNodeCount = existingBadgesArePresent ? 2 : 1;

  parent.children.splice(
    index,
    modifiedNodeCount,
    ...[
      {type: 'html', value: `<!--${badgeGroupType}-badges start -->`},
      existingBadgesArePresent ? nextNode : undefined,
      {type: 'html', value: `<!--${badgeGroupType}-badges end -->`}
    ].filter(Boolean)
  );

  return index + modifiedNodeCount;
}
