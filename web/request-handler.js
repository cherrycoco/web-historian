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
    console.log('stringified url', url);
    var body = '';
    req.on('data', function(data) {
      data = data.toString();
      body += data.slice(4) + '\n';
    });  
    req.on('end', function() {
      archive.addUrlToList(body, function() {
        res.writeHead(302, {'Content-Type': 'text/form'});
        res.end(body);
      });
    });
  }
  
  
};

 // describe('POST', function () {
 //      it('should append submitted sites to \'sites.txt\'', function(done) {
 //        var url = 'www.example.com';

 //        // Reset the test file and process request
 //        fs.closeSync(fs.openSync(archive.paths.list, 'w'));

 //        request
 //          .post('/')
 //          .type('form')
 //          .send({ url: url })
 //          .expect(302, function (err) {
 //            if (!err) {
 //              var fileContents = fs.readFileSync(archive.paths.list, 'utf8');
 //              expect(fileContents).to.equal(url + '\n');
 //            }

 //            done(err);
 //          });
 //      });
 //    });