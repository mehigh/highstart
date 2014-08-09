(function($) {

  var App = {

    /**
     * Init Function
     */
    init: function() {
      App.jsStart();
    },

    /**
     * Alternate the mobile search placeholder text
     */
    jsStart: function() {
      $('html').removeClass('nojs');
    }
  }

  $(function() {
    App.init();
  });

})(jQuery);