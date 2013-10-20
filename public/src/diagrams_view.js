
var DiagramsView = Parse.View.extend({
  initialize: function() {
    var view = this;

    diagrams.on("reset", function() {
      view.render();
    });

    diagrams.on("add", function() {
      view.render();
    });
  },

  render: function() {
    var view = this;

    view.$el.empty();
    diagrams.each(function(saved) {
      var $button = $("<div>").text(saved.id).button();
      view.$el.append($button);
      view.$el.append($("<br/>"));

      $button.click(function() {
        diagram.load(saved);
      });
    });
  }
});

$(function() {
  new DiagramsView({ el: $("#diagrams") });
});

