const path = require('path');
const freepack = require('freepack');
const generateOption = require('./generateOption');


exports = module.exports = function(argv, cli, env) {
    if (argv['module-coverage']) {
        return moduleCoverage(argv, cli, env);
    }

    // const freepackConfig = generateOption(argv, cli, env);

    // if (!freepackConfig) {
    //   return fis.log.info('skip freepack, release all file');
    // }

    // freepackConfig.release = Object.keys(
    //   freepackConfig.module
    // ).map(name => `${freepackConfig.symbol.module}${name}`);

    // const packer = freepack.packer(freepackConfig);
    // packer.init();

    // freepack.test(freepackConfig, () => {
    //   fis.log.info('test');
    // });
};

function moduleCoverage(argv, cli, env) {
    // mock env config
    process.env[generateOption.getENVConfigName(argv, cli, env)] = JSON.stringify({
        release: []
    });
    const freepackConfig = generateOption(argv, cli, env);

    freepackConfig.release = Object.keys(
        freepackConfig.module
    ).map(name => `${freepackConfig.symbol.module}${name}`);

    const packer = freepack.packer(freepackConfig);
    packer.init();
    const bundle = packer.bundle.curr;
    const files = bundle.getFile();
    let covers = 0;
    let uncover = [];
    files.forEach(item => {
        const match = packer.rules.test(item.path);
        if (match > -1) {
            covers += 1;
        } else {
            uncover.push(item);
        }
    });
    console.log(`Module Coverage ${
        (covers / files.length * 100).toFixed(2)
    }% (${covers}/${files.length})`);
    if (uncover.length > 0) {
        console.log(`Uncover files: ${uncover.length}`);
        console.log(`Root path: ${packer.dirs.curr}`);
        console.log(uncover.map(item => item.path).join('\n'));
    }
}
