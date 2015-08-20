//import Ember from 'ember';
import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:deep-link', {});

// initial state

test('initial property values', function(assert) {

  assert.expect(1);

  var sub = this.subject();

  assert.strictEqual(
    sub.get('isCancelBound'),
    false, 'isCancelBound has expected value'
  );
});

// methods

test('cancelAnimation method', function(assert) {

  assert.expect(1);

  var sub = this.subject();

  assert.strictEqual(
    typeof sub.cancelAnimation,
    'function', 'cancelAnimation method exists'
  );
});
