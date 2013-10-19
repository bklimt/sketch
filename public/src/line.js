
var Line = Backbone.Model.extend({
  type: "line",

  initialize: function(point) {
    this.width = 1;
    this.color = "black";
    this.magnets = _.times(3, function() {
      return new Magnet(point.x, point.y);
    });

    var model = this;
    attributes.on("change:strokeColor", function() {
      if (model.selected) {
        model.color = attributes.get("strokeColor");
        diagram.redraw();
      }
    });
    attributes.on("change:strokeWidth", function() {
      if (model.selected) {
        model.width = attributes.get("strokeWidth");
        diagram.redraw();
      }
    });
  },

  getLastMagnet: function() {
    return this.magnets[2];
  },

  draw: function(context) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];

    context.lineWidth = this.width;
    context.strokeStyle = this.color;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.closePath();
    context.stroke();
  },

  drawSelected: function(context) {
    _.each(this.magnets, function(magnet) {
      magnet.draw(context);
    });
  },

  containsPoint: function(point) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var minX = p1.x < p2.x ? p1.x : p2.x;
    var minY = p1.y < p2.y ? p1.y : p2.y;
    var maxX = p1.x > p2.x ? p1.x : p2.x;
    var maxY = p1.y > p2.y ? p1.y : p2.y;

    if (point.x >= minX && point.x <= maxX) {
      if (point.y >= minY && point.y <= maxY) {
        if (p2.x === p1.x) {
          if (point.x === p2.x) {
            return true;
          }
        } else {
          var slope = (p2.y - p1.y) / (p2.x - p1.x);
          var intercept = p2.y - slope * p2.x;
          var targetY = slope * point.x + intercept;
          if (Math.abs(point.y - targetY) < 5) {
            return true;
          }
        }
      }
    }

    return false;
  },

  moveMagnet: function(oldMagnet, newMagnet) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    if (oldMagnet === p0) {
      var dx = p2.x - p1.x;
      var dy = p2.y - p1.y;
      p0.x = newMagnet.x;
      p0.y = newMagnet.y;
      p1.x = newMagnet.x - (dx / 2);
      p1.y = newMagnet.y - (dy / 2);
      p2.x = newMagnet.x + (dx / 2);
      p2.y = newMagnet.y + (dy / 2);
    } else if (oldMagnet === p1) {
      p1.x = newMagnet.x;
      p1.y = newMagnet.y;
      p0.x = (p1.x + p2.x) / 2;
      p0.y = (p1.y + p2.y) / 2;
    } else if (oldMagnet === p2) {
      p2.x = newMagnet.x;
      p2.y = newMagnet.y;
      p0.x = (p1.x + p2.x) / 2;
      p0.y = (p1.y + p2.y) / 2;
    }
  },

  toJSON: function() {
    return {
      type: this.type,
      color: this.color,
      width: this.color,
      magnets: magnetListToJSON(this.magnets)
    }
  }

});

