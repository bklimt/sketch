
var SketchImage = Rectangle.extend({
  type: "image",

  initialize: function(attrs) {
    var point = attrs.point;

    this.url = attrs.url;
    this.width = attrs.width;
    this.height = attrs.height;

    if (attrs.magnets) {
      this.magnets = _.map(attrs.magnets, function(m) {
        return new Magnet(m);
      });
    } else {
      this.magnets = _.times(5, function() {
        return new Magnet(point);
      });
    }

    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];

    p0.x = p1.x + (this.width / 2);
    p0.y = p1.y + (this.height / 2);
    p4.x = p1.x + this.width;
    p4.y = p1.y + this.height;
    p2.x = p4.x;
    p2.y = p1.y;
    p3.x = p1.x;
    p3.y = p4.y;

    this.data = new Image();
    this.data.src = this.url;
    this.data.onload = function() {
      diagram.redraw();
    };
  },

  draw: function(context) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];
    var x = p1.x;
    var y = p1.y;
    var width = p4.x - p1.x;
    var height = p4.y - p1.y;

    context.drawImage(this.data, x, y, width, height);
  },
  
  toJSON: function() {
    return {
      type: this.type,
      url: this.url,
      width: this.width,
      height: this.height,
      magnets: _.map(this.magnets, function(m) { return m.toJSON(); })
    };
  }
});

