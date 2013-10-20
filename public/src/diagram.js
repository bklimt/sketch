
var SavedDiagram = Parse.Object.extend("Diagram");

var Diagram = Backbone.Model.extend({
  initialize: function(attrs) {
    attrs = attrs || {};

    this.shapes = [];
    this.$editor = $("#editor");

    if (attrs.shapes) {
      this.load(attrs);
    }
  },

  load: function(json) {
    if (json instanceof SavedDiagram) {
      return this.load(json.get("json"));
    }

    this.shapes = [];
    _.each(json.shapes, function(shape) {
      if (shape.type === "line") {
        this.shapes.push(new Line(shape));
      } else if (shape.type === "rectangle") {
        this.shapes.push(new Rectangle(shape));
      } else if (shape.type === "circle") {
        this.shapes.push(new Circle(shape));
      } else if (shape.type === "oval") {
        this.shapes.push(new Oval(shape));
      } else if (shape.type === "text") {
        this.shapes.push(new Text(shape));
      } else if (shape.type === "image") {
        this.shapes.push(new SketchImage(shape));
      } else {
        throw new Error("Unknown shape type: " + shape.type);
      }
    }, this);

    this.redraw();
  },

  clear: function() {
    this.load({ shapes: [] });
  },

  draw: function(canvas) {
    canvas = canvas || $("canvas");
    var context = canvas[0].getContext("2d");
    _.each(this.shapes, function(shape) {
      shape.draw(context);
    });
    _.each(this.shapes, function(shape) {
      if (this.isSelected(shape)) {
        shape.drawSelected(context);
      }
    }, this);
  },

  redraw: function() {
    var canvas = $("canvas");
    var context = canvas[0].getContext("2d");
    context.fillStyle = "rgb(255, 255, 255)";
    context.fillRect(0, 0, 800, 500);
    this.draw();
  },

  export: function() {
    var canvas = $("canvas");
    var dataURL = canvas[0].toDataURL("image/png");
    var base64 = /^data:image\/png;base64,(.*)$/.exec(dataURL)[1]

    var file = new Parse.File("export.png", { base64: base64 });

    return Parse.Promise.as().then(function() {
      return file.save();

    }).then(function(file) {
      var obj = new Parse.Object("ImageFile");
      obj.set("file", file);
      return obj.save();

    }).then(function(obj) {
      var url = "http://anysketch.parseapp.com/file/" + obj.id;
      var template = "<a target='_blank' href='<%= url %>'>exported file</a>";
      var html = _.template(template)({
        url: url
      });
      $("#export-link").html(html);
      return file;

    }).then(null, function(error) {
      console.error(error);
    });
  },

  getMagnetAtPoint: function(point) {
    // A variable to capture the value in the each loop.
    var magnet;
    _.find(this.shapes, function(shape) {
      if (this.isSelected(shape)) {
        magnet = _.find(shape.magnets, function(magnet) {
          return magnet.containsPoint(point);
        });
      }
      // Bail out of the find if we found a magnet.
      return magnet;
    }, this);
    return magnet;
  },

  moveMagnet: function(oldMagnet, newMagnet) {
    _.each(this.shapes, function(shape) {
      shape.moveMagnet(oldMagnet, newMagnet);
    });
  },

  save: function() {
    var model = this;

    var obj = new SavedDiagram();
    obj.set("json", this.toJSON());
    return Parse.Promise.as().then(function() {
      return model.export();

    }).then(function(file) {
      obj.set("preview", file);
      return obj.save()

    }).then(function() {
      diagrams.add(obj, { at: 0 });

    });
  },

  toJSON: function() {
    return {
      shapes: _.map(this.shapes, function(shape) { return shape.toJSON(); })
    }
  },

  selectShape: function(shape) {
    this.selectNone();
    shape.selected = true;
  },

  isSelected: function(shape) {
    return shape.selected;
  },

  selectNone: function() {
    _.each(this.shapes, function(shape) {
      shape.selected = false;
    });
    this.$editor.empty();
  },

  selectPoint: function(point, shift) {
    var magnet = this.getMagnetAtPoint(point);
    if (magnet) {
      SelectTool.selectedMagnets = [magnet];
      return;
    }

    // No magnets were found. Try selecting an object.
    var shape = _.find(this.shapes, function(shape) {
      return shape.containsPoint(point);
    });
    if (shape) {
      if (shape.selected && shift) {
        shape.selected = false;
        this.$editor.empty();
        SelectTool.selectedMagnets = [];
      } else {
        if (!shape.selected && !shift) {
          this.selectNone();
        }
        shape.selected = true;
        SelectTool.selectedMagnets = [];
        _.each(this.shapes, function(shape) {
          if (shape.selected) {
            SelectTool.selectedMagnets.push(shape.magnets[0]);
          }
        });
      }

      return;
    }

    SelectTool.selectedMagnets = [];
    if (!shift) {
      this.selectNone();
    }
  },

  deleteSelected: function() {
    this.shapes = _.filter(this.shapes, function(shape) {
      return !shape.selected;
    });
    this.redraw();
  }
});

$(function(root) {
  window.diagram = new Diagram();
});

