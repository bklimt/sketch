
$(function() {
  var $imageDrop = $("#image-drop");

  $imageDrop.on("dragover", function(evt) {
    evt.preventDefault();
  });

  $imageDrop.on("drop", function(evt) {
    evt.preventDefault();

    var files = evt.originalEvent.dataTransfer.files;
    var file = files[0];
    var name = file.name;
    var type = file.type;

    var parts = name.split(/\./);
    var ext = (parts.length > 1) ? ("." + parts[parts.length - 1]) : "";
    name = "image" + ext;

    var parseFile = new Parse.File(name, file, type);
    Parse.Promise.as().then(function() {
      $imageDrop.html("Uploading file...");
      return parseFile.save();

    }).then(function(file) {
      var image = new Parse.Object("ImageFile");
      image.set("file", file);
      $imageDrop.html("Analyzing file...");
      return image.save();

    }).then(function(obj) {
      var url = "http://anysketch.parseapp.com/file/" + obj.id;
      var width = obj.get("width");
      var height = obj.get("height");
      var image = new SketchImage({
        point: { x: 10, y: 10 },
        url: url,
        width: width,
        height: height
      });
      diagram.shapes.push(image);
      diagram.selectShape(image);
      SelectTool.select();
      diagram.redraw();

      $imageDrop.html("Drop an image here");

    }).then(null, function(error) {
      console.error(error);

      $imageDrop.html("Drop an image here");
    });
  });
});

