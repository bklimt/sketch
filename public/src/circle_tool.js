
var CircleTool = SelectTool.extend(null, {
  description: "Circle Tool",

  mouseDown: function(point, shift) {
    var circle = new Circle(point);
    diagram.shapes.push(circle);
    diagram.selectShape(circle);
    SelectTool.startDragging(circle.getLastMagnet(), point);
    diagram.redraw();
  },

  mouseUp: function(point, shift) {
    SelectTool.mouseUp(point, shift);
    SelectTool.select();
  }
});

