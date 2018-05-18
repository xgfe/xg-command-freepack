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
    let envConfig = getENVConfig(argv, cli, env);
    if (!envConfig) {
        return null;
    }

    let customConfig = getCustomConfig(argv, cli, env);

    const projectDir = process.cwd();
    const config = {
        git: projectDir,
        root: path.join(projectDir, customConfig.root || './src'),
        cache: path.resolve(projectDir, envConfig.cache || customConfig.cache || '.fpcache'),

        diff: envConfig.diff || customConfig.diff || 'auto',

        alias: merge('alias', customConfig.alias, envConfig.alias),
        module: merge('module', customConfig.module, envConfig.module),
        ignore: [].concat(customConfig.ignore || []).concat(envConfig.ignore || []),
        release: envConfig.release,

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


function getCustomConfig(argv, cli, env) {
    return readConfig(getCustomConfigPath(argv, cli, env)) || {};
}
exports.getCustomConfig = getCustomConfig;

function getENVConfig(argv, cli, env) {
    const ENV_NAME = getENVConfigName(argv, cli, env);
    const ENV = (process.env[ENV_NAME] || '').trim();
    if (!ENV) return null;
    if (/^[bv]/.test(ENV)) {
        // v1.2.3:a,b,c
        // b1.2.3:a,b,c
        try {
            const env = ENV.split(':');
            const type = env[0].charAt(0);
            const branch = env[0].slice(1);
            return {
                diff: type === 'b' ? `branch:${branch}` : `tag:v${branch}`,
                release: env[1].split(',').map(m => `@${m.trim()}`)
            };
        } catch (e) {
            return null;
        }
    }
    try {
        return JSON.parse(ENV);
    } catch (e) {
        return null;;
    }
}
exports.getENVConfig = getENVConfig;

function getCustomConfigPath(argv, cli, env) {
    return typeof configPath === 'string' ? configPath : '/freepack.config.js';
}
exports.getCustomConfigPath = getCustomConfigPath;

function getENVConfigName(argv, cli, env) {
    return typeof argv.e === 'string'
        ? argv.e
        : typeof argv.env === 'string'
            ? argv.env
            : 'FREEPACK';
}
exports.getENVConfigName = getENVConfigName;
