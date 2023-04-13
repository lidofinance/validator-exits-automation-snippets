#!/usr/bin/env zx

const ethdo = './ethdo';
const node = 'http://35.228.211.212:5052';

console.info(chalk.green(`Fetching network state for offline use of ethdo`));
await $`${ethdo} validator exit --prepare-offline --connection=${node} --timeout=300s --verbose --debug`;
console.info(chalk.green(`Network state fetched`));
