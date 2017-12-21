var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

var paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

exports.paths = paths;

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

var readListOfUrls = function(callback) {
  fs.readFile(paths.list, function (err, data) {
    data = data.toString().split('\n');
    callback(data);
  });
};

exports.readListOfUrls = readListOfUrls;
 
var isUrlInList = function(url, callback) {
  readListOfUrls( function(data) {
    if (data.includes(url)) {
      callback(true);
    } else {
      callback(false);
    }

  });
};

exports.isUrlInList = isUrlInList;

var addUrlToList = function(url, callback) {
  isUrlInList(url, function (isInList) {
    if (!isInList) {
      fs.appendFile(paths.list, url, function (err) {
        if (err) {
          console.log('error addUrlToList', err);
        }
      });
    }
    callback();
  });
};

exports.addUrlToList = addUrlToList;

var isUrlArchived = function(url, callback) {
  fs.exists(paths.archivedSites + '/' + url, function(exists) {
    if (exists) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

exports.isUrlArchived = isUrlArchived;

var downloadUrls = function(urls) {
  urls.forEach(function (url) {
    fs.writeFile(paths.archivedSites + '/' + url, url, function (err) {
      if (err) {
        console.log(err);
      }
    });
  });
};

exports.downloadUrls = downloadUrls;
