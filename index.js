const fs = require('fs');
const path = require('path');
const freepack = require('freepack');
const shell = require('shelljs');
const version = require('./package.json').version;

const run = require('./lib/run');


exports.name = 'freepack';
exports.desc = 'xg freepack pulgin, using freepack';
exports.options = {
  'init': 'create freepack.config.js file',
  'env <config>': 'stringify env.config.json file',
  'test [--module-coverage]': 'test rules',
  'diff': 'show changes between previous version',
  '-c <config>': 'path of the config file',
  '-e --env <ENV_NAME>': 'pack env name, default FREEPACK',
  '-v --version': 'version',
  '-h, --help': 'print this help message'
};

exports.run = function(argv, cli, env) {
  // 显示帮助信息
  if (argv.h || argv.help) {
    return cli.help(exports.name, exports.options);
  }

  if (argv.v || argv.version) {
    console.log(`freepack version ${freepack.version}`);
    console.log(`xg-command-freepack version ${version}`);
    return;
  }

  fis.log.info(`freepack@v${freepack.version}`);
  fis.log.info(`xg-command-freepack@v${version}`);

  const command = argv['_'][1];
  if (command) {
    // init, env, test
    return typeof run[command] === 'function'
      ? run[command](argv, cli, env)
      : fis.log.error('invalid command');
  }

  return run(argv, cli, env);
};
