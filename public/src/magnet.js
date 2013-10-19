
var Magnet = function(x, y) {
  this.x = x;
  this.y = y;
};

_.extend(Magnet.prototype, {

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
  }
});

_.extend(Magnet, {

  add: function(magnet1, magnet2) {
    return new Magnet(magnet1.x + magnet2.x, magnet1.y + magnet2.y);
  },

  highlight: function(magnet) {
    if (magnet !== Magnet.highlighted) {
      Magnet.highlighted = magnet;
      diagram.redraw();
    }
  }
});

