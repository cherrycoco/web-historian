var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');

// require more modules/folders here!
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var headers = defaultCorsHeaders;
headers['Content-Type'] = 'text/html';

exports.handleRequest = function (req, res) {
  var parsedUrl = url.parse(req.url);
  var endPoint = parsedUrl.pathname;
  if (req.method === 'GET') {
    if (endPoint === '/') {
      fs.readFile(__dirname + '/public/index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data.toString());
      });
    } else {
      archive.isUrlArchived(req.url, function(exists) {
        if (exists) {
          fs.readFile(archive.paths.archivedSites + '/' + req.url, function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
          });
        } else {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end();
        }

      });

    }
  } 
  
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function(data) {
      data = data.toString();
      body += data.slice(4) + '\n';
    });  
    var location = archive.paths.archivedSites + '/' + body;
    req.on('end', function() {
      archive.addUrlToList(body, function() {
        console.log('body is: ', body);
        res.writeHead(302, {'Location': location, 'Content-Type': 'text/html'});
        res.end(body);
      });
    });
  }  
};