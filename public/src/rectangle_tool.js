
var RectangleTool = SelectTool.extend(null, {
  description: "Rectangle Tool",

  mouseDown: function(point, shift) {
    var rect = new Rectangle(point);
    diagram.shapes.push(rect);
    diagram.selectShape(rect);
    SelectTool.startDragging(rect.getLastMagnet(), point);
    diagram.redraw();
  },

  mouseUp: function(point, shift) {
    SelectTool.mouseUp(point, shift);
    SelectTool.select();
  }
});

