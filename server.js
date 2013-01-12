var
  express   = require('express'),
  http      = require('http'),
  request   = require('request'),
  csv       = require('csv'),
  fs        = require('fs'),
  util      = require('util');

var app = express();

var ogdReady = false;
var wlReady = false;
var allReady = false;

// Mappings.
var fromWL = new Array();
var fromOGD = new Array();

// Data.
var wlData = new Array();
var ogdData = new Array();
var allData = {};


function update() {
  // Get mappings from csv data.
  var file = __dirname + '/data/WL_Aufzugsdaten_CreateCamp_12012013.csv';
  csv() .from.stream(fs.createReadStream(file), { delimiter: ';', columns: true})
    .on('record', function(data,index) {
      fromWL[data.BMID] = data;
      fromOGD[data.Anlagen_ID] = data;
    })
    .on('end', function(count) {

      // Get aufzugData from ogd vienna.
      var url = 'http://data.wien.gv.at/daten/wfs?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:AUFZUGOGD&srsName=EPSG:4326&outputFormat=json';
      request(url, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          var aufzugData = JSON.parse(data);

          for (var i in aufzugData.features) {
            var aufzug = aufzugData.features[i];
            ogdData[aufzug.properties.ANLAGEN_ID] = aufzug;
          }
          ogdReady = true;
          console.log('ogd ready');
          updateEnd();
        }
      });

      // Get aufzugData from ogd vienna.
      var url = 'http://ogd-createcamp-wienerlinien.at/webservice.ft/getTrafficInfoList?sender=createcamp19&relatedLines=all';
      request(url, function (error, response, data) {
        if (!error && response.statusCode == 200) {
          var infoList = JSON.parse(data);

          for (var i in infoList.data.trafficInfos) {
            var info = infoList.data.trafficInfos[i];

            if (info.refTrafficInfoCategoryId == 1) {
              wlData[info.name] = info;
            }
          }
          wlReady = true;
          console.log('wl ready');
          updateEnd();
        }
      });
    })
  ;
}

function updateEnd() {
  if (!allReady && ogdReady && wlReady) {
    // Merge data.
    for (var i in ogdData) {
      var item = ogdData[i];

      if (fromOGD[i] != undefined) {
        var id = 'eD_' + fromOGD[i].BMID;
        if (wlData[id] != undefined) {
          item.status = wlData[id];
        }
      }
      allData[i] = item;
    }
    console.log('all ready');
  }
}

// Prepare data.
update();

app.get('/', function(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(allData));
});

app.listen(8080);
