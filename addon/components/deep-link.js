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
   * @description bind properties to component's tag attributes in the DOM
   * @name        classNames
   * @type        {integer}
   */
  attributeBindings: ['normalizedHref:href'],
  /**
   * @description scroll animation duration in milliseconds, superceded
   *   by `this.speed`
   * @name        duration
   * @type        {integer}
   */
  duration: 0,
  /**
   * @description target id/name
   * @name        duration
   * @type        {string}
   */
  href: '',
  /**
   * @description whether scrollTo events can be cancelled/overridden
   * @name        duration
   * @type        {string}
   */
  mutable: true,
  /**
   * @description normalized version of href, used to bind href dom attribute
   * @name        normalizedHref
   * @type        {integer}
   */
  normalizedHref: '',
  /**
   * @description speed in pixels/seconds to scroll
   * @name        duration
   * @type        {integer}
   */
  speed: 999999999,
  /**
   * @description component's tag in the DOM
   * @name        tagName
   * @type        {string}
   */
  tagName: 'a',
  /**
   * @description text contained in the href, overridden by yielded content
   * @name        duration
   * @type        {string}
   */
  text: '',

  // methods

  /**
   * @description calculate how long a scroll event should take
   * @name        calculateDuration
   */
  calculateDuration: function(distance) {

        distance = parseInt(distance);
    var duration = this.normalizeDuration();
    var speed = this.normalizeSpeed();

    // if a duration was specified
    if (duration > 0) {

      return duration;

    // if a speed was specified
    } else if (speed > 0 && !isNaN(distance)) {

      return Math.floor(distance / speed * 1000);

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
   * @description scroll to an anchor tag with the specified name attribute
   * @name        goToAnchor
   */
  goToAnchor: function() {

    // cancel currently executing `scrollTo` events
    this.cancelAnimation();

    var component = this;
    var currentPosition = Ember.$('body').scrollTop();
    var distance = 0;
    var easing = this.get('easing');
    var $target = Ember.$('a[name="'+ this.get('href') +'"], #' + this.get('href'));
    // y position of the target element; defaults to current position, which is
    // used when no target is found
    var targetPosition = currentPosition;

    // check for known jQuery property, for safety
    if ($target.selector && $target.length) {

      targetPosition = $target.offset().top;

      // set the distance between here and there
      distance = Math.abs(currentPosition - targetPosition);
    }

    // scroll to the target position
    if (distance > 0) {

      Ember.$('body')
        .animate(
          { scrollTop: targetPosition +'px' },
          component.calculateDuration(distance),
          easing
        );
    }
  },
  /**
   * @description runs once the component element has been inserted into DOM
   * @name        didInsertElement
   */
  init: function() {

    this._super();

    this.normalizeHref();

    var component = this;
    var deepLinkService = this.get('deepLinkService');


    // check if there is already a cancel event bound to scroll. this prevents
    //   duplicate bindings for mulitple components
    // @todo:
    // - look into a hash to manage unbinding
    if (!deepLinkService.get('isCancelBound')) {

      deepLinkService.set('isCancelBound', true);

      // run a debounce'd cancelAnimation() on manual scroll events to avoid scrolljacking
      Ember.$(window).bind('scroll mousedown DOMMouseScroll mousewheel keyup touchmove', function(e) {

        // check for manual scroll/click interactions
        if (e.which > 0 || e.type === 'mousedown' || e.type === 'mousewheel' || e.type === 'touchmove') {

          Ember.run.throttle(component, component.cancelAnimation, 500);
        }
      });
    }
  },
  /**
   * @description normalize the value of duration, ensuring it's an integer
   * @name        normalizeDuration
   */
  normalizeDuration: function() {

    var duration = parseInt(this.get('duration'));

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
    if (typeof duration === 'number' && !isNaN(duration)) {

      return duration;

    } else {

      return 0;
    }
  },
  /**
   * @description normalize the value of href, ensuring it's a string prepended
   *   with a hash
   * @name        normalizeHref
   */
  normalizeHref: function() {

    var href = this.get('href');
    var type = typeof href;

    switch (type === 'string' || (type === 'number' && !isNaN(href))) {

      case true: href = '#' + href; break;
      default: href = '#';
    }

    this.set('normalizedHref', href);

    return href;
  },
  /**
   * @description normalize the value of speed, ensuring it's an integer
   * @name        normalizeSpeed
   */
  normalizeSpeed: function() {

    var speed = parseInt(this.get('speed'));

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
    if (typeof speed === 'number' && !isNaN(speed)) {

      return speed;

    } else {

      return 999999999;
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
