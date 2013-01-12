var
  request   = require('request');

wl_live = {

  data: {},
  ready: false,

  update: function(url) {
    // Get aufzugData from ogd vienna.
    if (url == undefined) {
      url = 'http://ogd-createcamp-wienerlinien.at/webservice.ft/getTrafficInfoList?sender=createcamp19&relatedLines=all';
    }

    request(url, function (error, response, data) {
      if (!error && response.statusCode == 200) {
        var infoList = JSON.parse(data);

        for (var i in infoList.data.trafficInfos) {
          var info = infoList.data.trafficInfos[i];

          if (info.refTrafficInfoCategoryId == 1) {
            wl_live.data[info.name] = info;
          }
        }
        wl_live.ready = true;
        console.log('wl ready');
      }
    });
  }

}

module.exports = wl_live;
