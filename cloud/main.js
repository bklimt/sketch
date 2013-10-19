
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
    request.object.set("width", image.width());
    request.object.set("height", image.height());
    request.object.set("format", image.format());

  }).then(function() {
    response.success();
  }, function(error) {
    response.error(error);
  });
});
