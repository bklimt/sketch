
var ShapeTool = SelectTool.extend(null, {
  description: "Shape Tool",

  mouseDown: function(point, shift) {
    var shape = new this.type(point);
    diagram.shapes.push(shape);
    diagram.selectShape(shape);
    SelectTool.startDragging(shape.getLastMagnet(), point);
    diagram.redraw();
  },

  mouseUp: function(point, shift) {
    SelectTool.mouseUp(point, shift);
    SelectTool.select();
  }
});

var LineTool = ShapeTool.extend(null, { type: Line });
var RectangleTool = ShapeTool.extend(null, { type: Rectangle });
var OvalTool = ShapeTool.extend(null, { type: Oval });
var CircleTool = ShapeTool.extend(null, { type: Circle });
var TextTool = ShapeTool.extend(null, { type: Text });

