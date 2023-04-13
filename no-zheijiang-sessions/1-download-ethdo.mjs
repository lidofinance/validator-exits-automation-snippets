#!/usr/bin/env zx

// see https://github.com/wealdtech/ethdo/releases
const ethDoVersion = '1.28.4';
const platform = 'linux-amd64';

// download release
await $`curl -L -O https://github.com/wealdtech/ethdo/releases/download/v${ethDoVersion}/ethdo-${ethDoVersion}-${platform}.tar.gz`;

// untar
await $`tar -xf ethdo-${ethDoVersion}-${platform}.tar.gz`;

// removing tar
await $`rm ethdo-${ethDoVersion}-${platform}.tar.gz`;