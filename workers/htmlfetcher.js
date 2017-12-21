// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

// var helpers = require('../helpers/archive-helpers');
// var urls = [];

// var addToQueue = function(url) {
//   // upon click it's going to add url to the urls array
//   helpers.addUrlToList(url, function() {
//     return [url]
//   });
// };

// var fetchUrl = function(urls) {
//   urls.forEach(function(url) {
//     helpers.isUrlArchived(url, function(exist) {
//       if (!exist) {
//         helpers.downloadUrls(url)
//       }
//     });
//   });
  
// };

// $('document').ready(function() {
//   $('input').on('keypress', function(e) {
//     if (e.keyCode === 13) {
      
//       $.ajax({
//         type: 'POST',
//         url: $('input').val(),
//         data: data,
//         success: function() {
//           console.log('succeeded');
//         },
//         dataType: 'text/plain'
//       });
//     }
//   });  
// });