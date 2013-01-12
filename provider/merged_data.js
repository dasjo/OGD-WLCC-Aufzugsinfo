merged_data = {

  data: null,

  update: function(mapping, ogd_static, wl_live, callback) {
    console.log('updating merged data');
    // Merge ogd + wl data.
    var tmp_data = { type: "FeatureCollection", features: [] };
    var ogd_data = ogd_static.data;
    var wl_data = wl_live.data;

    for (var i in ogd_data) {
      var item = ogd_data[i];

      var id = mapping.ogdIdtoWLId(i);
      if (id != undefined) {
        var status = wl_live.getStatus(id);
        if (status != undefined) {
          item.status = status;
        }
      }
      tmp_data.features.push(item);
    }
    console.log('merged data ready');
    merged_data.data = tmp_data;
    callback(null, merged_data.data);
  }

}

module.exports = merged_data;
