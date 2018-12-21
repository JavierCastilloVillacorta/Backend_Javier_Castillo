const fs     = require('fs'),
      path   = require('path')

// Datos obtenidos del JSON
module.exports = {
  getData: function(){
    var sef = this
    let dataPath = __dirname + path.join('/data/data.json')
    return new Promise(function(resolve, reject){
      fs.readFile(dataPath, 'utf8', function(err, readData){
        if(err) reject(err)
        resolve(JSON.parse(readData))
      })
    })
  }
}
