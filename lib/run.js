const path = require('path');
const freepack = require('freepack');
const generateOption = require('./generateOption');


exports = module.exports = function(argv, cli, env) {
  const freepackConfig = generateOption(argv, cli, env);

  if (!freepackConfig) {
    return fis.log.info('skip freepack, release all file');
  }

  freepack(freepackConfig, () => {
    fis.log.info('success');
  });
};

exports.init = require('./init');
exports.diff = require('./diff');
exports.test = require('./test');
exports.env = require('./env');
