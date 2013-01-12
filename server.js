var
  express   = require('express'),
  http      = require('http'),
  request   = require('request'),
  csv       = require('csv'),
  fs        = require('fs'),
  async     = require('async'),
  util      = require('util');

var app = express();

var
  mapping = require('./provider/mapping.js'),
  ogd_static = require('./provider/ogd_static.js'),
  wl_live = require('./provider/wl_live.js'),
  merged_data = require('./provider/merged_data.js');

function update() {
  async.parallel(
    [
      mapping.update,
      ogd_static.update,
      wl_live.update
    ],
    function (err, results) {
      console.log('parallel finished');
      if (err) {
        console.log(err);
      }
      else {
        console.log(results);
        merged_data.update(mapping, ogd_static, wl_live,
          function(err, results) {
            console.log(err);
            console.log(results);
          });
        }
      }
  );
}

// Prepare data.
update();

app.get('/', function(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(merged_data.data));
});

app.listen(8080);
