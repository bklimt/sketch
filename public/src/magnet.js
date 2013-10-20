
var Magnet = Backbone.Model.extend({

  initialize: function(attrs) {
    this.x = attrs.x;
    this.y = attrs.y;
  },

  draw: function(context) {
    var width = 5;
    if (this === Magnet.highlighted) {
      width = 10;
      context.fillStyle = "rgb(100, 100, 0)";
    } else {
      context.fillStyle = "rgb(0, 0, 0)";
    }
    context.fillRect(this.x - width / 2, this.y - width / 2, width, width);
  },

  containsPoint: function(pt) {
    return (pt.x >= this.x - 4 && pt.x <= this.x + 4 && pt.y >= this.y - 4 &&
            pt.y <= this.y + 4);
  },

  toJSON: function() {
    return { x: this.x, y: this.y };
  }

}, {

  add: function(magnet1, magnet2) {
    return new Magnet({
      x: magnet1.x + magnet2.x,
      y: magnet1.y + magnet2.y
    });
  },

  highlight: function(magnet) {
    if (magnet !== Magnet.highlighted) {
      Magnet.highlighted = magnet;
      diagram.redraw();
    }
  }
});

