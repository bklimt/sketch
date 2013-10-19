
Parse.initialize("ZgbTUOWkBdzUzFsXxHucXVjybyx2ytKpX89Oo2Yj",
    "gpwHVOndBx3S7Ns4ToVoNgFQLvbcHNk4AmmnxI2L");

$(function() {

  var canvas = $("canvas");

  canvas.mousedown(function(evt) {
    if (Tool.current) {
      Tool.current.mouseDown({ x: evt.offsetX, y: evt.offsetY }, evt.shiftKey);
    }
  });

  canvas.mouseup(function(evt) {
    if (Tool.current) {
      Tool.current.mouseUp({ x: evt.offsetX, y: evt.offsetY }, evt.shiftKey);
    }
  });

  canvas.mousemove(function(evt) {
    if (Tool.current) {
      Tool.current.mouseMove({ x: evt.offsetX, y: evt.offsetY }, evt.shiftKey);
    }
  });

  SelectTool.select();
  diagram.redraw();

});

