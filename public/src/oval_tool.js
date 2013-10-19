
var OvalTool = SelectTool.extend(null, {
  description: "Oval Tool",

  mouseDown: function(point, shift) {
    var oval = new Oval(point);
    diagram.shapes.push(oval);
    diagram.selectShape(oval);
    SelectTool.startDragging(oval.getLastMagnet(), point);
    diagram.redraw();
  },

  mouseUp: function(point, shift) {
    SelectTool.mouseUp(point, shift);
    SelectTool.select();
  }
});

