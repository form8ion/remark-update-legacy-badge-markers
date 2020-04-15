import any from '@travi/any';
import {assert} from 'chai';
import replaceMarkers from './marker-replacer';

suite('marker replacer modifier', () => {
  const originalParentChildren = any.listOf(any.simpleObject);

  test('that a legacy status marker is replaced by modern zones', () => {
    const parentChildren = [...originalParentChildren];
    const nodeIndex = any.integer({max: parentChildren.length});

    assert.equal(
      replaceMarkers({type: 'html', value: '<!-- status badges -->'}, nodeIndex, {children: parentChildren}),
      nodeIndex + 1
    );
    assert.deepEqual(
      parentChildren,
      [
        ...originalParentChildren.slice(0, nodeIndex),
        {type: 'html', value: '<!--status-badges start -->'},
        {type: 'html', value: '<!--status-badges end -->'},
        ...originalParentChildren.slice(nodeIndex + 1)
      ]
    );
  });

  test('that a legacy consumer marker is replaced by modern zones', () => {
    const parentChildren = [...originalParentChildren];
    const nodeIndex = any.integer({max: parentChildren.length});

    assert.equal(
      replaceMarkers({type: 'html', value: '<!-- consumer badges -->'}, nodeIndex, {children: parentChildren}),
      nodeIndex + 1
    );
    assert.deepEqual(
      parentChildren,
      [
        ...originalParentChildren.slice(0, nodeIndex),
        {type: 'html', value: '<!--consumer-badges start -->'},
        {type: 'html', value: '<!--consumer-badges end -->'},
        ...originalParentChildren.slice(nodeIndex + 1)
      ]
    );
  });

  test('that a legacy contribution marker is replaced by modern zones', () => {
    const parentChildren = [...originalParentChildren];
    const nodeIndex = any.integer({max: parentChildren.length});

    assert.equal(
      replaceMarkers({type: 'html', value: '<!-- contribution badges -->'}, nodeIndex, {children: parentChildren}),
      nodeIndex + 1
    );
    assert.deepEqual(
      parentChildren,
      [
        ...originalParentChildren.slice(0, nodeIndex),
        {type: 'html', value: '<!--contribution-badges start -->'},
        {type: 'html', value: '<!--contribution-badges end -->'},
        ...originalParentChildren.slice(nodeIndex + 1)
      ]
    );
  });

  test('that an unexpected zone is not replaced', () => {
    const parentChildren = [...originalParentChildren];

    assert.isUndefined(replaceMarkers(
      {type: 'html', value: `<!-- ${any.word()} badges -->`},
      any.integer(),
      {children: parentChildren}
    ));
    assert.deepEqual(parentChildren, originalParentChildren);
  });

  test('that non-html nodes are not modified', () => {
    assert.isUndefined(replaceMarkers({type: any.word()}));
  });
});
