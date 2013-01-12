merged_data = {

  data: null,

  ready: false,

  update: function(mapping, ogd_static, wl_live) {
    // Merge ogd + wl data.
    var tmp_data = { type: "FeatureCollection", features: [] };
    var ogd_data = ogd_static.data;
    var wl_data = wl_live.data;

    for (var i in ogd_data) {
      var item = ogd_data[i];

      var id = mapping.ogdIdtoWLId(i);
      if (id != undefined) {
        var status = wl_data.getStatus(id);
        if (status != undefined) {
          item.status = status;
        }
      }
      tmp_data.features.push(item);
    }
    console.log('merged data ready');
    data = tmp_data;
  }

}

module.exports = merged_data;
