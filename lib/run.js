const path = require('path');
const freepack = require('freepack');
const generateOption = require('./generateOption');
const stringify2ENV = require('./util/stringify2ENV');


exports = module.exports = function(argv, cli, env) {
  const freepackConfig = generateOption(argv, cli, env);

  freepack(freepackConfig, () => {
    fis.log.info('success');
  });
};

exports.init = require('./init');
exports.diff = require('./diff');
exports.test = require('./test');
exports.env = require('./env');
