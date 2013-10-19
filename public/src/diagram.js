
var Diagram = Backbone.Model.extend({
  initialize: function() {
    this.shapes = [];
    this.$editor = $("#editor");
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

  toJSON: function() {
    // TODO(klimt): Do this.
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
  }
});

$(function(root) {
  window.diagram = new Diagram();
});

