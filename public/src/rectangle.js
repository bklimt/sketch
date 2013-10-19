
var Rectangle = Line.extend({
  type: "rectangle",

  initialize: function(point) {
    this.color = attributes.get("fillColor");
    this.magnets = _.times(5, function() {
      return new Magnet(point.x, point.y);
    });

    var model = this;
    attributes.on("change:fillColor", function() {
      if (model.selected) {
        model.color = attributes.get("fillColor");
        diagram.redraw();
      }
    });
  },

  getLastMagnet: function() {
    return this.magnets[4];
  },

  draw: function(context) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];
    context.fillStyle = this.color;
    context.fillRect(p1.x, p1.y, p4.x - p1.x, p4.y - p1.y);    
  },

  containsPoint: function(pt) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];
    return (pt.x > p1.x && pt.y > p1.y && pt.x < p4.x && pt.y < p4.y);
  },

  moveMagnet: function(oldMagnet, newMagnet) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];
    var width = p4.x - p1.x;
    var height = p4.y - p1.y;

    if (oldMagnet === p0) {
      p1.x = newMagnet.x - width / 2;
      p1.y = newMagnet.y - height / 2;
    } else if (oldMagnet === p1) {
      width = p4.x - newMagnet.x;
      height = p4.y - newMagnet.y;
      p1.x = newMagnet.x;
      p1.y = newMagnet.y;
    } else if (oldMagnet === p2) {
      width = newMagnet.x - p1.x;
      height = p4.y - newMagnet.y;
      p1.y = newMagnet.y;
    } else if (oldMagnet === p3) {
      width = p4.x - newMagnet.x;
      height = newMagnet.y - p1.y;
      p1.x = newMagnet.x;
    } else if (oldMagnet === p4) {
      width = newMagnet.x - p1.x;
      height = newMagnet.y - p1.y;
    } else {
      return;
    }

    p0.x = p1.x + (width / 2);
    p0.y = p1.y + (height / 2);
    p4.x = p1.x + width;
    p4.y = p1.y + height;
    p2.x = p4.x;
    p2.y = p1.y;
    p3.x = p1.x;
    p3.y = p4.y;
  },
  
  toJSON: function() {
    return {
      type: this.type,
      color: this.color,
      magnets: magnetListToJSON(this.magnets)
    };
  }
});

