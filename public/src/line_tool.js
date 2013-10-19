
var LineTool = SelectTool.extend(null, {
  description: "Line Tool",

  mouseDown: function(point, shift) {
    var line = new Line(point);
    diagram.shapes.push(line);
    diagram.selectShape(line);
    SelectTool.startDragging(line.getLastMagnet(), point);
    diagram.redraw();
  },

  mouseUp: function(point, shift) {
    SelectTool.mouseUp(point, shift);
    SelectTool.select();
  }
});

