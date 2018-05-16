const readConfig = require('./util/readConfig');


exports = module.exports = function(argv, cli, env) {
  const config = readConfig(argv['_'][2]);

  if (!config) {
    return fis.log.error('config not exist');
  }

  fis.log.info(stringify2ENV(config));
};