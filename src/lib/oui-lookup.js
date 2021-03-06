'use-strict';

var fs = require('fs');
var path = require('path');

var mapping = (function() {
  var retval = [];
  var data = fs.readFileSync(path.resolve(__dirname, 'oui-mapping.csv'), 'UTF-8').split(/\r\n|\r|\n/g);
  for (var i = 0; i < data.length; i++) {
    var line = data[i];
    if (line && line[0] !== '#') {
      retval.push(line.split('\t'));
    }
  }
  return retval;
})();

function resolveMacToDeviceType(mac) {
  var normalizedMacAddress = mac.toUpperCase();
  for (var i = 0; i < mapping.length; i++) {
    if (normalizedMacAddress >= mapping[i][0] && normalizedMacAddress <= mapping[i][1]) {
      return mapping[i][2];
    }
  }
}

exports.resolveMacToDeviceType = resolveMacToDeviceType;
