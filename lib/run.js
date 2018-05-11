const path = require('path');
const freepack = require('freepack');
const generateOption = require('./generateOption');
const readConfig = require('./util/readConfig');
const stringify2ENV = require('./util/stringify2ENV');


exports = module.exports = function(argv, cli, env) {
  const freepackConfig = generateOption(
    getCustomConfig(argv.c),
    getENVConfig(typeof argv.e === 'string' ? argv.e : argv.env)
  );

  if (argv.d || argv.diff) {
    return freepack.diff(freepackConfig, () => {
      fis.log.info('diff');
    });
  }

  if (argv.t || argv.test) {
    return freepack.test(freepackConfig, () => {
      fis.log.info('test');
    });
  }

  freepack(freepackConfig, () => {
    fis.log.info('success');
  });
};

exports.init = require('./init');

exports.env = function(argv, cli, env) {
  const config = readConfig(argv['_'][2]);

  if (!config) {
    return fis.log.error('config not exist');
  }

  fis.log.info(stringify2ENV(config));
};

function getENVConfig(ENV_NAME) {
  try {
    const ENV = process.env[typeof ENV_NAME === 'string' ? ENV_NAME : 'FREEPACK'];
    return JSON.parse(ENV);
  } catch (e) {
    return {};
  }
}

function getCustomConfig(configPath) {
  return readConfig(
    typeof configPath === 'string'
      ? configPath
      : '/freepack.config.js'
  ) || {};
}