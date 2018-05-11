const path = require('path');


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

exports = module.exports = function(custom = {}, env = {}) {
  const projectDir = process.cwd();

  const config = {
    git: projectDir,
    root: path.join(projectDir, env.root || custom.root || './src'),
    cache: path.resolve(projectDir, env.cache || custom.cache || '.fpcache'),

    diff: env.diff || custom.diff || 'auto',

    alias: merge(custom.alias, env.alias),
    module: merge(custom.module, env.module),
    release: [].concat(custom.release || []).concat(env.release || []),

    dot: custom.dot || false,
    ignoreCase: custom.ignoreCase || false,
    symbol: custom.symbol || {
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