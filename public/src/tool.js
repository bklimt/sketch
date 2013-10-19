
var Tool = Backbone.Model.extend(null, {
  description: "Tool",

  select: function() {
    Tool.current = this;
    console.log("selected " + this.description);
  }
});

