
var Circle = Oval.extend({
  type: "circle",

  draw: function(context) {
    var p0 = this.magnets[0];
    var p1 = this.magnets[1];
    var p2 = this.magnets[2];
    var p3 = this.magnets[3];
    var p4 = this.magnets[4];
    var radius = (p4.x - p1.x) / 2;

    context.beginPath();
    context.arc(p1.x + radius, p1.y + radius, radius, 0, 2 * Math.PI, false);
    context.closePath();
    context.fillStyle = this.fillColor;
    context.fill();
  }
});

