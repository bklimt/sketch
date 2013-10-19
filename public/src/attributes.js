
var Attributes = Backbone.Model.extend({
  defaults: {
    fillColor: "#888888",
    strokeColor: "#444444",
    strokeWidth: 1
  }
});

var attributes = new Attributes();

$(function() {
  var $fillColor = $("#fillColor");
  $fillColor.val(attributes.get("fillColor"));
  $fillColor.change(function(evt) {
    attributes.set("fillColor", $fillColor.val());
  });

  var $strokeColor = $("#strokeColor");
  $strokeColor.val(attributes.get("strokeColor"));
  $strokeColor.change(function(evt) {
    attributes.set("strokeColor", $strokeColor.val());
  });

  var $strokeWidth = $("#strokeWidth");
  $strokeWidth.val(attributes.get("strokeWidth"));
  $strokeWidth.change(function(evt) {
    attributes.set("strokeWidth", $strokeWidth.val());
  });
});
