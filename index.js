var http = require("http");
var fs = require("fs");
var extract = require("./extract");
/*eslint-disable no-unused-vars*/
var wss = require("./websockets-server");
var errorPath = ("app/error.html");
var mime = require("mime");

var handleError = function(err, res) {
  fs.readFile(errorPath, function(err, data) {
    res.writeHead(404, {
      "Content-Type": mime.getType(errorPath)
    });
    res.write(data);
    res.end();
  });
};

var server = http.createServer(function(req, res) {
  console.log("Responding to a request.");
  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      handleError(err, res);
      return;
    } else {
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    }
    res.end(data);
  });
});
server.listen(3000);
