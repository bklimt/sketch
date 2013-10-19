
var SelectTool = Tool.extend(null, {
  description: "Select Tool",

  startDragging: function(magnet, point) {
    SelectTool.selectedMagnets = [magnet];
    SelectTool.previousPosition = point;
  },

  mouseDown: function(point, shift) {
    diagram.selectPoint(point, shift);
    SelectTool.previousPosition = point;
    diagram.redraw();
  },

  mouseUp: function(point, shift) {
    SelectTool.selectedMagnets = [];
    SelectTool.previousPosition = null;
  },

  mouseMove: function(point, shift) {
    Magnet.highlight(diagram.getMagnetAtPoint(point));
    _.each(SelectTool.selectedMagnets, function(magnet) {
      var negatedPreviousPosition = {
        x: -SelectTool.previousPosition.x,
        y: -SelectTool.previousPosition.y
      };
      var delta = Magnet.add(point, negatedPreviousPosition);
      diagram.moveMagnet(magnet, Magnet.add(magnet, delta));
    });
    SelectTool.previousPosition = point;
    diagram.redraw();
  }
});

