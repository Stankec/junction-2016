//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require moment
//= require underscore
//= require gmaps/google
//= require admin/maps

$(document).ready(documentReady);

function documentReady() {
  buildMaps();
}

function buildMaps() {
  var $maps = $('[data-map]');

  $maps.each(
    function(index, map) {
      var $map = $(map);
      var gmap = new Maps($map);
    }
  );
}
