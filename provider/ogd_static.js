var
  request   = require('request');

ogd_static = {

  data: {},

  update: function(callback) {
    console.log('updating ogd static');
    // Get aufzugData from ogd vienna.
    var url = 'http://data.wien.gv.at/daten/wfs?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:AUFZUGOGD&srsName=EPSG:4326&outputFormat=json';
    request({uri: url, encoding: 'binary'}, function (error, response, data) {
      if (!error && response.statusCode == 200) {
        var aufzugData = JSON.parse(data);

        for (var i in aufzugData.features) {
          var aufzug = aufzugData.features[i];
          ogd_static.data[aufzug.properties.ANLAGEN_ID] = aufzug;
        }
        console.log('ogd static ready');
        callback(null, ogd_static.data);
      }
    });
  }

}

module.exports = ogd_static;
