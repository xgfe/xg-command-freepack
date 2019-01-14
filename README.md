# xg-command-freepack
xg tag plugin, for use freepack.

## Usage
```shell
cd $project_dir
xg freepack init # [Optional] Create freepack.config.js file
xg freepack
```

### OPTIONS
`xg freepack -c <config>`
`xg freepack -e, --env <ENV_NAME>`
`xg freepack -v, --version`
`xg freepack -h, --help`

**`xg freepack init`**
**`xg freepack env <config>`**
**`xg freepack test [--module-coverage]`**
<!-- **`xg freepack diff`** -->


## ENV (default FREEPACK)
### String
#### TAG
v1.0.2:moduleA,moduleB

#### BRANCH
bBranch_name:moduleA,moduleB

### JSON
xg freepack env path/config.js

## freepack.config.js
> [freepack config](https://github.com/xgfe/freepack)
