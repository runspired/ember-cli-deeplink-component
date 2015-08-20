import Ember from 'ember';

export default Ember.Component.extend({

  // services

  /**
   * @access      private
   * @description service carrying shared logic and methods for deep-link components
   * @name        deepLinkService
   * @type        {Ember.Service}
   */
  deepLinkService: Ember.inject.service('deep-link'),

  // properties

  /**
   * @access      public
   * @description bind properties to component's tag attributes in the DOM
   * @name        classNames
   * @type        {integer}
   */
  attributeBindings: ['decoratedHref:href'],
  /**
   * @access      private
   * @description sanitized `this.duration`
   * @name        decoratedDuration
   * @returns     {integer} time in milliseconds to scroll
   */
  decoratedDuration: Ember.computed('duration', function() {

    var duration = parseInt(this.get('duration'));

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
    if (typeof duration === 'number' && !isNaN(duration)) {

      return duration;

    } else {

      return 0;
    }
  }),
  /**
   * @access      private
   * @description sanitized `this.href`
   * @name        decoratedHref
   * @type        {Ember.computed}
   * @returns     {string} the target anchor name, decorated with a '#'
   */
  decoratedHref: Ember.computed('href', function() {

    var href = this.get('href');
    var type = typeof href;

    switch (type === 'string' || (type === 'number' && !isNaN(href))) {

      case false: href = ''; break;
    }

    return '#' + href;
  }),
  /**
   * @access      private
   * @description sanitized `this.speed`
   * @name        decoratedSpeed
   * @type        {Ember.computed}
   * @returns     {integer} pixels/second to scroll at
   */
  decoratedSpeed: Ember.computed('speed', function() {

    var speed = parseInt(this.get('speed'));

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
    if (typeof speed === 'number' && !isNaN(speed)) {

      return speed;

    } else {

      return 999999999;
    }
  }),
  /**
   * @access      public
   * @description scroll animation duration in milliseconds, superceded
   *   by `this.speed`
   * @name        duration
   * @type        {integer}
   */
  duration: 0,
  /**
   * @access      public
   * @description target id/name
   * @name        duration
   * @type        {string}
   */
  href: '',
  /**
   * @access      public
   * @description whether scrollTo events can be cancelled/overridden
   * @name        duration
   * @type        {string}
   */
  mutable: true,
  /**
   * @access      public
   * @description speed in pixels/seconds to scroll
   * @name        duration
   * @type        {integer}
   */
  speed: 999999999,
  /**
   * @access      public
   * @description component's tag in the DOM
   * @name        tagName
   * @type        {string}
   */
  tagName: 'a',
  /**
   * @access      public
   * @description text contained in the href, overridden by yielded content
   * @name        duration
   * @type        {string}
   */
  text: '',

  // methods

  calculateDuration: function(distance) {

    distance = parseInt(distance);

    // if a speed was specified, return an appropriate duration to maintain
    // that speed
    if (this.get('decoratedSpeed') > 0 && !isNaN(distance)) {

      return Math.floor(distance / this.get('decoratedSpeed') * 1000);

    } else {

      return 0;
    }
  },

  /**
   * @description runs the `cancelAnimation` method on DeepLinkService
   * @name        cancelAnimation
   */
  cancelAnimation: function() {

    this.get('deepLinkService').cancelAnimation(this.get('mutable'));
  },
  /**
   * @description runs once the component element has been inserted into DOM
   * @name        didInsertElement
   */
  didInsertElement: function() {

    this._super();

    var component = this;
    var deepLinkService = this.get('deepLinkService');

    // check if there is already a cancel event bound to scroll, prevents
    //   duplicate bindings for mulitple components
    // @todo: ensure one component being removed won't unbind scroll for other
    //   DeepLinkComponents on the page
    if (!deepLinkService.get('isCancelBound')) {

      deepLinkService.set('isCancelBound', true);

      // run a debounce'd cancelAnimation() on manual scroll events to avoid scrolljacking
      Ember.$(window).bind('scroll mousedown DOMMouseScroll mousewheel keyup', function(e) {

        // check for manual scroll/click interactions
        if (e.which > 0 || e.type === 'mousedown' || e.type === 'mousewheel') {

          Ember.run.throttle(component, component.cancelAnimation, 500);
        }
      });
    }
  },
  /**
   * @description scroll to an anchor tag with the specified name attribute
   * @name        goToAnchor
   */
  goToAnchor: function() {

    // cancel currently executing `scrollTo` events
    this.cancelAnimation();

    var currentPosition = Ember.$('body').scrollTop();
    var distance = 0;
    var easing = this.get('easing');
    var $target = Ember.$('a[name='+ this.get('href') +'], ' + this.get('decoratedHref'));
    // y position of the target element; defaults to current position, which is
    // used when no target is found
    var targetPosition = currentPosition;

    // check for known jQuery property, for safety
    if ($target.selector && $target.length) {

      targetPosition = $target.offset();
      targetPosition = targetPosition.top;

      // set the distance between here and there
      distance = Math.abs(currentPosition - targetPosition);
    }

    // scroll to the target position
    if (distance > 0) {

      Ember.$('body')
        .animate(
          { scrollTop: targetPosition +'px' },
          calculateDuration(distance),
          easing
        );
    }
  },

  // actions

  /**
   * @description handle a click event on the DOM element
   * @name        click
   */
  click: function(e) {

    e.preventDefault();

    // scroll to the target anchor
    this.goToAnchor();
  }
});
