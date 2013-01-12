var
  request   = require('request');

ogd_static = {

  data: {},
  ready: false,

  update: function(url) {
    // Get aufzugData from ogd vienna.
    if (url == undefined) {
      url = 'http://data.wien.gv.at/daten/wfs?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:AUFZUGOGD&srsName=EPSG:4326&outputFormat=json';
    }
    request({uri: url, encoding: 'binary'}, function (error, response, data) {
      if (!error && response.statusCode == 200) {
        var aufzugData = JSON.parse(data);

        for (var i in aufzugData.features) {
          var aufzug = aufzugData.features[i];
          ogd_static.data[aufzug.properties.ANLAGEN_ID] = aufzug;
        }
        mapping.ready = true;
        console.log('ogd ready');
      }
    });
  }

}

module.exports = ogd_static;
