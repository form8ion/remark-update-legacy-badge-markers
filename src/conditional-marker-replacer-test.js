import any from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';
import * as markerReplacer from './marker-replacer';
import conditionallyReplaceMarkers from './conditional-marker-replacer';

suite('conditional marker replacer modifier', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(markerReplacer, 'default');
  });

  teardown(() => sandbox.restore());

  test('that a legacy markers are replaced by modern zones', () => {
    const nodeIndex = any.integer();
    const nextIndex = any.integer();
    const badgeGroupType = any.fromList(['status', 'consumer', 'contribution']);
    const parent = any.simpleObject();
    markerReplacer.default.withArgs(parent, nodeIndex, badgeGroupType).returns(nextIndex);

    assert.equal(
      conditionallyReplaceMarkers(
        {type: 'html', value: `<!-- ${badgeGroupType} badges -->`},
        nodeIndex,
        parent
      ),
      nextIndex
    );
  });

  test('that an unexpected zone is not replaced', () => {
    assert.isUndefined(conditionallyReplaceMarkers(
      {type: 'html', value: `<!-- ${any.word()} badges -->`},
      any.integer(),
      any.simpleObject()
    ));
    assert.notCalled(markerReplacer.default);
  });

  test('that non-html nodes are not modified', () => {
    assert.isUndefined(conditionallyReplaceMarkers({type: any.word()}));
    assert.notCalled(markerReplacer.default);
  });
});
