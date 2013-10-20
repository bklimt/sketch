
var Oval = Rectangle.extend({
  type: "oval",

  draw: function(context) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];
    var radius = (p4.x - p1.x) / 2;

    context.beginPath();
    context.moveTo(p1.x + radius, p1.y);
    context.quadraticCurveTo(p2.x, p2.y, p2.x, p1.y + radius);
    context.quadraticCurveTo(p4.x, p4.y, p1.x + radius, p4.y);
    context.quadraticCurveTo(p3.x, p3.y, p1.x, p1.y + radius);
    context.quadraticCurveTo(p1.x, p1.y, p1.x + radius, p1.y);
    context.closePath();
    context.fillStyle = this.fillColor;
    context.fill();
  },

  containsPoint: function(point) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];
    var radius = (p4.x - p1.x) / 2;
    var xdist = point.x - (p1.x + radius);
    var ydist = point.y - (p1.y + radius);
    var dist = Math.sqrt(xdist * xdist + ydist * ydist);
    return (dist < radius);
  }
});

