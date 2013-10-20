
require('cloud/app.js');

var Image = require("parse-image");

Parse.Cloud.beforeSave("ImageFile", function(request, response) {
  Parse.Promise.as().then(function() {
    var obj = request.object;
    var file = obj.get("file");
    return Parse.Cloud.httpRequest({ url: file.url() });

  }).then(function(response) {
    var image = new Image();
    return image.setData(response.buffer);

  }).then(function(image) {
    if (image.width() <= 600 && image.height() <= 400) {
      return image;
    }

    var width = image.width();
    var height = image.height();
    var ratio = width / height;

    if (width > 600) {
      width = 600;
      height = Math.floor(width / ratio);
    }

    if (height > 400) {
      height = 400;
      width = Math.floor(height * ratio);
    }

    return image.scale({ width: width, height: height });

  }).then(function(image) {
    request.object.set("width", image.width());
    request.object.set("height", image.height());
    request.object.set("format", image.format());

  }).then(function() {
    response.success();
  }, function(error) {
    response.error(error);
  });
});
