// import DS from 'ember-data';
import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

/*
  services
  - deepLinkService

  properties
  - attributeBindings
  - decoratedDuration
  - decoratedHref
  - decoratedSpeed
  - duration
  - href
  - mutable
  - speed
  - tagName
  - text

  methods
  - cancelAnimation
  - didInsertElement
  - goToAnchor

  actions
  - click
*/


moduleForComponent('deep-link', {});

// initial state

test('initial property values', function(assert) {

  assert.expect(10);

  var sub = this.subject();

  assert.ok(function() {

    // @todo check if deepEqual is better. would require checking into why a
    // binding of ariaRole:role is being added

    var bindings = sub.get('attributeBindings');
    var pass = true;
    var requiredBindings = ['decoratedHref:href'];
    var y = requiredBindings.length;
    var z = 0;

    for (z; z < y; z++) {
      if (bindings.indexOf(requiredBindings[z]) === -1) {
        pass = false;
      }
    }

    return pass;

  }, 'attributeBindings has expected entries');

  assert.strictEqual(
    sub.get('decoratedDuration'),
    0, 'decoratedDuration has expected value'
  );

  assert.strictEqual(
    sub.get('decoratedHref'),
    '#', 'decoratedHref has expected value'
  );

  assert.strictEqual(
    sub.get('decoratedSpeed'),
    999999999, 'decoratedSpeed has expected value'
  );

  assert.strictEqual(
    sub.get('duration'),
    0, 'duration has expected value'
  );

  assert.strictEqual(
    sub.get('href'),
    '', 'href has expected value'
  );

  assert.strictEqual(
    sub.get('mutable'),
    true, 'mutable has expected value'
  );

  assert.strictEqual(
    sub.get('speed'),
    999999999, 'speed has expected value'
  );

  assert.strictEqual(
    sub.get('tagName'),
    'a', 'tagName has expected value'
  );

  assert.strictEqual(
    sub.get('text'),
    '', 'text has expected value'
  );
});

// computed properties

test('decoratedDuration computed property', function(assert) {

  assert.expect(6);

  var sub = this.subject();

  Ember.run(function() { sub.set('duration', 100); });
  assert.strictEqual(
    sub.get('decoratedDuration'),
    100, 'typeof integer is computed');

  Ember.run(function() { sub.set('duration', '100'); });
  assert.strictEqual(
    sub.get('decoratedDuration'),
    100, 'typeof string containing integer is computed');

  Ember.run(function() { sub.set('duration', 'text'); });
  assert.strictEqual(
    sub.get('decoratedDuration'),
    0, 'typeof string containing text is overwritten');

  Ember.run(function() { sub.set('duration', []); });
  assert.strictEqual(
    sub.get('decoratedDuration'),
    0, 'typeof array is overwritten');

  Ember.run(function() { sub.set('duration', true); });
  assert.strictEqual(
    sub.get('decoratedDuration'),
    0, 'typeof boolean containing true is overwritten');

  Ember.run(function() { sub.set('duration', {}); });
  assert.strictEqual(
    sub.get('decoratedDuration'),
    0, 'typeof object is overwritten');
});

test('decoratedHref computed property', function(assert) {

  assert.expect(5);

  var sub = this.subject();

  Ember.run(function() { sub.set('href', 420); });
  assert.strictEqual(
    sub.get('decoratedHref'),
    '#420', 'typeof integer is computed');

  Ember.run(function() { sub.set('href', 'target-link'); });
  assert.strictEqual(
    sub.get('decoratedHref'),
    '#target-link', 'typeof string is computed');

  Ember.run(function() { sub.set('href', []); });
  assert.strictEqual(
    sub.get('decoratedHref'),
    '#', 'typeof array is overwritten');

  Ember.run(function() { sub.set('href', true); });
  assert.strictEqual(
    sub.get('decoratedHref'),
    '#', 'typeof boolean is overwritten');

  Ember.run(function() { sub.set('href', {}); });
  assert.strictEqual(
    sub.get('decoratedHref'),
    '#', 'typeof object is overwritten');
});

test('decoratedSpeed computed property', function(assert) {

  assert.expect(6);

  var sub = this.subject();

  Ember.run(function() { sub.set('speed', 100); });
  assert.strictEqual(
    sub.get('decoratedSpeed'),
    100, 'typeof integer is computed');

  Ember.run(function() { sub.set('speed', '100'); });
  assert.strictEqual(
    sub.get('decoratedSpeed'),
    100, 'typeof string containing integer is computed');

  Ember.run(function() { sub.set('speed', 'text'); });
  assert.strictEqual(
    sub.get('decoratedSpeed'),
    999999999, 'typeof string containing text is overwritten');

  Ember.run(function() { sub.set('speed', []); });
  assert.strictEqual(
    sub.get('decoratedSpeed'),
    999999999, 'typeof array is overwritten');

  Ember.run(function() { sub.set('speed', true); });
  assert.strictEqual(
    sub.get('decoratedSpeed'),
    999999999, 'typeof boolean containing true is overwritten');

  Ember.run(function() { sub.set('speed', {}); });
  assert.strictEqual(
    sub.get('decoratedSpeed'),
    999999999, 'typeof object is overwritten');
});

// methods

test('calculateDuration method', function(assert) {

  assert.expect(6);

  var sub = this.subject();

  assert.strictEqual(
    sub.calculateDuration(0),
    0, 'distance of 0 without speed set');

  assert.strictEqual(
    sub.calculateDuration(10000),
    0, 'distance of 10,000 without speed set');

  Ember.run(function() { sub.set('speed', 1000); });
  assert.strictEqual(
    sub.calculateDuration(0),
    0, 'distance of 0 with speed set to 1,000');

  assert.strictEqual(
    sub.calculateDuration(10000),
    10000, 'distance of 10,000 with speed set to 1,000');

  Ember.run(function() { sub.set('speed', 1024); });
  assert.strictEqual(
    sub.calculateDuration(1280),
    1250, 'distance of 1,280 with speed set to 1,024');

  Ember.run(function() { sub.set('speed', 1280); });
  assert.strictEqual(
    sub.calculateDuration(1024),
    800, 'distance of 1,024 with speed set to 1,280');
});
