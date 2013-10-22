
var express = require('express');
var app = express();

app.set('views', 'cloud/views');
app.set('view engine', 'jade');
app.use(express.bodyParser());

var proxyImage = function(id, response) {
  var obj = new Parse.Object("ImageFile");
  obj.id = id;
  Parse.Promise.as().then(function() {
    return obj.fetch();

  }).then(function() {
    var file = obj.get("file");
    return Parse.Cloud.httpRequest({ url: file.url() });

  }).then(function(httpResponse) {
    if (httpResponse.status === 200) {
      return httpResponse.buffer;
    }
    return Parse.Promise.error(httpResponse.text);

  }).then(function(buffer) {
    response.set('Content-Type', obj.get("type"));
    response.send(buffer);

  }, function(error) {
    console.error(error);
    response.send(500, error);
  });
};

app.get('/file/:id', function(request, response) {
  proxyImage(request.params.id, response);
});

app.get('/image/:id.png', function(request, response) {
  proxyImage(request.params.id, response);
});


app.listen();
