const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const run = require('./lib/run');


exports.name = 'freepack';
exports.desc = 'xg freepack pulgin, using freepack';
exports.options = {
  'init': 'create freepack.config.js file',
  'env <config>': 'stringify env.config.json file',
  '-c <config>': 'path of the config file',
  '-e --env <ENV_NAME>': 'pack env name, default FREEPACK',
  // '-d --diff': 'show changes between previous version',
  // '-t --test': 'test rules',
  '-h, --help': 'print this help message'
};

exports.run = function(argv, cli, env) {
  // 显示帮助信息
  if (argv.h || argv.help) {
    return cli.help(exports.name, exports.options);
  }

  switch (argv['_'][1]) {
    case 'init':
      return run.init(argv, cli, env);
    case 'env':
      return run.env(argv, cli, env);
    default:
      return run(argv, cli, env);
  }
};