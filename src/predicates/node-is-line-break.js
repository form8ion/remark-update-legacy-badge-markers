export default function nodeIsLineBreak(node) {
  return 'text' === node.type && '\n' === node.value;
}
