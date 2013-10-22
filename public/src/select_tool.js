
var SelectTool = Tool.extend(null, {
  description: "Select Tool",

  startDragging: function(magnet, point) {
    SelectTool.isMouseDown = true;
    SelectTool.selectedMagnets = [magnet];
    SelectTool.previousPosition = point;
  },

  mouseDown: function(point, shift) {
    SelectTool.isMouseDown = true;
    diagram.selectPoint(point, shift);
    SelectTool.previousPosition = point;
    diagram.redraw();
  },

  mouseUp: function(point, shift) {
    SelectTool.isMouseDown = false;
    SelectTool.selectedMagnets = [];
    SelectTool.previousPosition = null;
  },

  mouseMove: function(point, shift) {
    Magnet.highlight(diagram.getMagnetAtPoint(point));
    if (SelectTool.isMouseDown) {
      diagram.highlightNone();
      _.each(SelectTool.selectedMagnets, function(magnet) {
        var negatedPreviousPosition = {
          x: -SelectTool.previousPosition.x,
          y: -SelectTool.previousPosition.y
        };
        var delta = Magnet.add(point, negatedPreviousPosition);
        diagram.moveMagnet(magnet, Magnet.add(magnet, delta));
      });
      SelectTool.previousPosition = point;

    } else {
      diagram.highlightShape(diagram.getShapeAtPoint(point));
    }
    diagram.redraw();
  }
});

