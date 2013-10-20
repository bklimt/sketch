
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
      var template = "<div><img src='<%= thumbnail %>'><br/><%= id %></div>";
      var html = _.template(template)({
        thumbnail: saved.get("thumbnail").url(),
        id: saved.id
      });

      var $button = $("<div>").html(html).button();
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

