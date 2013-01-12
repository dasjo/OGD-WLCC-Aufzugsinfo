var
  csv       = require('csv'),
  fs        = require('fs');

mapping = {

  fromWL: {},
  fromOGD: {},

  ready: false,

  update: function() {
    // Get mappings from csv data.
    var file = __dirname + '/data/WL_Aufzugsdaten_CreateCamp_12012013.csv';
    csv() .from.stream(fs.createReadStream(file), { delimiter: ';', columns: true})
      .on('record', function(data,index) {
        mapping.fromWL[data.BMID] = data;
        mapping.fromOGD[data.Anlagen_ID] = data;
      })
      .on('end', function(count) {
        mapping.ready = true;
        console.log('mapping ready');
      })
      .on('error', function(error) {
        console.log(error);
      })
    ;
  },

  ogdIdtoWLId: function(ogdId) {
    if (data[ogdId] != undefined) {
      return id = 'eD_' + mapping.fromOGD[i].BMID;
    }
  }

}

module.exports = mapping;
