const path = require('path');
const readConfig = require('./util/readConfig');


function merge(...args) {
  const obj = {};
  const type = args[0];
  args.slice(1).forEach((arg = {}) => {
    for (let key in arg) {
      if (key in obj) {
        throw new Error(`${key} repeate in ${type}`);
      }
      obj[key] = arg[key];
    }
  });
  return obj;
}

exports = module.exports = function(argv, cli, env) {
  const projectDir = process.cwd();

  let customConfig = getCustomConfig(argv.c) || {};
  let envConfig = getENVConfig(typeof argv.e === 'string' ? argv.e : argv.env) || {};

  const config = {
    git: projectDir,
    root: path.join(projectDir, envConfig.root || customConfig.root || './src'),
    cache: path.resolve(projectDir, envConfig.cache || customConfig.cache || '.fpcache'),

    diff: envConfig.diff || customConfig.diff || 'auto',

    alias: merge('alias', customConfig.alias, envConfig.alias),
    module: merge('module', customConfig.module, envConfig.module),
    release: [].concat(customConfig.release || []).concat(envConfig.release || []),

    dot: customConfig.dot || false,
    ignoreCase: customConfig.ignoreCase || false,
    symbol: {
      negation: '!',
      relation: ':',
      separation: ',',
      file: '$',
      regexp: '~',
      match: '-',
      alias: '$',
      module: '@'
    },

    match: 'strict'
  };

  return config;
};


function getCustomConfig(configPath) {
  return readConfig(
    typeof configPath === 'string'
      ? configPath
      : '/freepack.config.js'
  ) || {};
}

function getENVConfig(ENV_NAME) {
  try {
    const ENV = process.env[typeof ENV_NAME === 'string' ? ENV_NAME : 'FREEPACK'];
    return JSON.parse(ENV);
  } catch (e) {
    return {};
  }
}