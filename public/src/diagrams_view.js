
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
    var $ul = $("<ul>");
    diagrams.each(function(saved) {
      $ul.append($("<li>").text(saved.id));
    });

    this.$el.empty();
    this.$el.append($ul);
  }
});

$(function() {
  new DiagramsView({ el: $("#diagrams") });
});

