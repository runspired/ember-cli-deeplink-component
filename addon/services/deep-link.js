import Ember from 'ember';

export default Ember.Service.extend({

  // properties

  /**
   * @description whether the `cancelAnimation` method has already been bound to
   *   scroll by a DeepLinkComponent
   * @name        isCancelBound
   * @type        {boolean}
   */
  isCancelBound: false,

  // methods

  /**
   * @description cancel currently executing `scrollTo` events
   * @name        cancelAnimation
   */
  cancelAnimation: function(isMutable) {

    var $body = Ember.$('body');

    // check if stopping animation is necessary... stop it
    if (isMutable && $body.is(':animated')) {

      $body.stop();
    }
  }
});
