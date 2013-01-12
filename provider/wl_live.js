var
  request   = require('request');

wl_live = {

  data: {},

  update: function(callback) {
    console.log('updating wl live');
    // Get aufzugData from ogd vienna.
    var url = 'http://ogd-createcamp-wienerlinien.at/webservice.ft/getTrafficInfoList?sender=createcamp19&relatedLines=all';
    request(url, function (error, response, data) {
      if (!error && response.statusCode == 200) {
        var infoList = JSON.parse(data);

        for (var i in infoList.data.trafficInfos) {
          var info = infoList.data.trafficInfos[i];

          if (info.refTrafficInfoCategoryId == 1) {
            wl_live.data[info.name] = info;
          }
        }
        console.log('wl ready');
        callback(null, wl_live.data);
      }
    });
  },

  getStatus: function(id) {
    return wl_live.data[id];
  }

}

module.exports = wl_live;
