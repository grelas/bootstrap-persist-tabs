"use strict";

if( typeof Object.create !== 'function' ) {
  Object.create = function( obj ) {
    function F(){}
    F.prototype = obj;
    return new F();
  };
}

;(function( $, window, document, undefined ){
  var pluginName = 'persistTabs';

  var Plugin = {
    init: function( options, elem ){
      var self = this;
      self.elem = elem;
      self.$elem = $( elem );
      self.options = $.extend( {}, $.fn[pluginName].defaults, self.$elem.data(), options );
      self.bind();
    },

    bind: function(){
      var self = this,
          $window = $(window);

      $window
        .on('hashchange', function(){
          self.onHashChange( self.$elem )
        })
        .trigger('hashchange');
    },

    onHashChange: function( el ){
      var hash = window.location.hash,
          tab_item = hash ? el.find('a').filter('[href=' + hash +']') : el.find('li.active > a');
          
      tab_item.tab('show');
    }
  };

  $.fn[pluginName] = function( options ) {
    return this.each(function(){
      var instance = Object.create( Plugin );
      instance.init( options, this );
    });
  };

  $.fn[pluginName].defaults = {};

})( jQuery, window, document );