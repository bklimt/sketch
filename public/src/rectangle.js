
var Rectangle = Line.extend({
  type: "rectangle",

  initialize: function(attrs) {
    this.fillColor = attrs.fillColor || attributes.get("fillColor");

    if (attrs.magnets) {
      this.magnets = _.map(attrs.magnets, function(m) {
        return new Magnet(m);
      });
    } else {
      this.magnets = _.times(5, function() {
        return new Magnet(attrs.point);
      });
    }

    var model = this;
    attributes.on("change:fillColor", function() {
      if (model.selected) {
        model.fillColor = attributes.get("fillColor");
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
    context.fillStyle = this.fillColor;
    context.fillRect(p1.x, p1.y, p4.x - p1.x, p4.y - p1.y);    
  },

  containsPoint: function(pt) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];
    var inX = (pt.x > p1.x && pt.x < p4.x) || (pt.x > p4.x && pt.x < p1.x);
    var inY = (pt.y > p1.y && pt.y < p4.y) || (pt.y > p4.y && pt.y < p1.y);
    return inX && inY;
  },

  moveMagnet: function(oldMagnet, newMagnet) {
    /*
     * 1 2
     *  0
     * 3 4
     */

    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];
    var width = p4.x - p1.x;
    var height = p4.y - p1.y;

    // Make sure p1 and width and height are correct.

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

    // Put everything else into the right relative position.

    p0.x = p1.x + (width / 2);
    p0.y = p1.y + (height / 2);
    p4.x = p1.x + width;
    p4.y = p1.y + height;
    p2.x = p4.x;
    p2.y = p1.y;
    p3.x = p1.x;
    p3.y = p4.y;

    // Flip the thing if it's backwards.
    // Actually, this won't work because the wrong magnet is selected.
    /*
    if (width < 0) {
      // This is flipped around the y axis.
      p1.x = p4.x;
      p3.x = p2.x;
      p3.x = p1.x;
      p4.x = p2.x;
      p0.x = (p1.x + p2.x) / 2;
    }

    if (height < 0) {
      // This is flipped around the x axis.
      p1.y = p4.y;
      p3.y = p2.y;
      p2.y = p1.y;
      p4.y = p3.y;
      p0.y = (p1.y + p3.y) / 2;
    }
    */
  },
  
  toJSON: function() {
    return {
      type: this.type,
      fillColor: this.fillColor,
      magnets: _.map(this.magnets, function(magnet) {
        return magnet.toJSON();
      })
    };
  }
});

