// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var helpers = require('../helpers/archive-helpers');

fs.readFile(paths.list, function (err, data) {
  data = data.toString().split('\n');
  helpers.downloadUrls(data);
})();