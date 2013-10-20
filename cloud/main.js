
require('cloud/app.js');

var Image = require("parse-image");

Parse.Cloud.beforeSave("ImageFile", function(request, response) {
  Parse.Promise.as().then(function() {
    var obj = request.object;
    var file = obj.get("file");
    return Parse.Cloud.httpRequest({ url: file.url() });

  }).then(function(httpResponse) {
    var image = new Image();
    return image.setData(httpResponse.buffer);

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

    // TODO(klimt): Actually resize the image in the file.

  }).then(function() {
    response.success();
  }, function(error) {
    response.error(error);
  });
});

Parse.Cloud.beforeSave("Diagram", function(request, response) {
  Parse.Promise.as().then(function() {
    var obj = request.object;
    var file = obj.get("preview");
    console.log("Requesting " + file.url());
    return Parse.Cloud.httpRequest({ url: file.url() });

  }).then(function(httpResponse) {
    var image = new Image();
    console.log("Setting data to " + httpResponse.buffer);
    return image.setData(httpResponse.buffer);

  }).then(function(image) {
    var width = image.width();
    var height = image.height();
    var ratio = width / height;

    width = 128;
    height = Math.floor(width / ratio);
    console.log("Resizing to " + width + "x" + height);
    return image.scale({ width: width, height: height });

  }).then(function(image) {
    console.log("Getting image data");
    return image.data();

  }).then(function(buffer) {
    var file = new Parse.File("thumbnail.png", {
      base64: buffer.toString("base64")
    });
    console.log("Saving new file");
    return file.save();

  }).then(function(file) {
    console.log("Setting thumbnail to new file");
    request.object.set("thumbnail", file);

  }).then(function() {
    response.success();
  }, function(error) {
    response.error(error);
  });
});
