
var Attributes = Backbone.Model.extend({
  defaults: {
    fillColor: "#888888",
    strokeColor: "#444444",
    strokeWidth: 1,
    text: "hello",
    fontFamily: "verdana",
    fontSize: 18
  }
});

var attributes = new Attributes();

$(function() {
  var bindEdit = function(attr) {
    var $el = $("#" + attr);
    $el.val(attributes.get(attr));
    $el.change(function(evt) {
      attributes.set(attr, $el.val());
    });
  };

  bindEdit("fillColor");
  bindEdit("strokeColor");
  bindEdit("strokeWidth");
  bindEdit("text");
  bindEdit("fontFamily");
  bindEdit("fontSize");
});

