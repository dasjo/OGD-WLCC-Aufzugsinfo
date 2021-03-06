var
  express   = require('express'),
  http      = require('http'),
  request   = require('request'),
  csv       = require('csv'),
  fs        = require('fs'),
  async     = require('async'),
  util      = require('util'),

  // Data providers.
  mapping = require('./provider/mapping.js'),
  ogd_static = require('./provider/ogd_static.js'),
  wl_live = require('./provider/wl_live.js'),
  merged_data = require('./provider/merged_data.js');

var app = express();

// Update static providers in parallel, once in a while.
function timeStatic(callback) {
  async.parallel([
      mapping.update,
      ogd_static.update
    ],
    function(err) {
      if (!err) {
        if (callback) { callback(); }
        setTimeout(timeStatic, 10 * 60 * 1000); // Every 10min.
      }
    }
  )
}

// Update live data, then merged data in series, often.
function timeLive(callback) {
  async.series([
      wl_live.update,
      function(callback) {
        merged_data.update(mapping, ogd_static, wl_live, callback);
      }
    ],
    function(err) {
      if (callback) { callback(); }
      setTimeout(timeLive, 2 * 1000); // Every 2sec.
    }
  )
}

// Start timers in series (make sure, static data is available before processing live data).
async.series([
    timeStatic,
    timeLive,
  ],
  function(err) {
    if (!err) {
      // Data is available, change response function.
      responseFunction = function(req, res, next) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(merged_data.data));
      };
    }
  }
);

// Default response: data not ready, override when ready.
var responseFunction = function(req, res, next) {
  res.writeHead(503, { });
  res.end("data not ready");
};

app.get('/', function(req, res, next) {
  responseFunction(req, res, next);
});
app.listen(8080);
