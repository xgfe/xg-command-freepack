const path = require('path');
const freepack = require('freepack');
const generateOption = require('./generateOption');
const readConfig = require('./util/readConfig');
const stringify2ENV = require('./util/stringify2ENV');


exports = module.exports = function(argv, cli, env) {
  const freepackConfig = generateOption(argv, cli, env);

  freepackConfig.release = Object.keys(
    freepackConfig.module
  ).map(name => `${freepackConfig.symbol.module}${name}`);

  const packer = freepack.packer(freepackConfig);
  packer.init();

  if (argv['module-coverage']) {
    return moduleCoverage(packer);
  }
  // freepack.test(freepackConfig, () => {
  //   fis.log.info('test');
  // });
};

function moduleCoverage(packer) {
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