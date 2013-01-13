var
  csv       = require('csv'),
  fs        = require('fs');

mapping = {

  // fromWL: {},
  fromOGD: {},

  /**
   * Get mappings from csv data.
   */
  update: function(callback) {
    console.log('updating mapping');
    var file = __dirname + '/data/WL_Aufzugsdaten_CreateCamp_12012013.csv';
    csv() .from.stream(fs.createReadStream(file), { delimiter: ';', columns: true})
      .on('record', function(data,index) {
        // mapping.fromWL[data.BMID] = data;
        mapping.fromOGD[data.Anlagen_ID] = data;
      })
      .on('end', function(count) {
        console.log('mapping ready');
        callback(null, mapping.fromOGD);
      })
      .on('error', function(error) {
        console.log(error);
      })
    ;
  },

  ogdIdtoWLId: function(ogdId) {
    if (mapping.fromOGD[ogdId] != undefined) {
      return 'eD_' + mapping.fromOGD[ogdId].BMID;
    }
  }

}

module.exports = mapping;
