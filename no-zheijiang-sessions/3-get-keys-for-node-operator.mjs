#!/usr/bin/env zx

import { writeFile,  } from 'fs/promises';

const safeParseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

if (argv.help) {
  console.log(`Example: ./3-get-keys-for-node-operator.mjs --kapi=http://35.228.211.212:5052 --operator-id=1`);
  process.exit(1);
}

let { kapi, operatorId } = argv;

//kapi = 'http://zhejiang-keys-api.testnet.fi';
//operatorId = '1';

if (!kapi) { kapi = await question('Key-api url, eg http://zhejiang-keys-api.testnet.fi: '); }
if (!operatorId) { operatorId = await question('Operator ID, eg 1: '); }


if (!kapi || !operatorId) {
  console.error(chalk.red('Please provide all required parameters.'));
  process.exit(10);
}

const stakingModuleId = 1; // Node Operators Registry
const urlpath = `/v1/modules/${stakingModuleId}/validators/validator-exits-to-prepare/${operatorId}?percent=20`;

console.info(chalk.green(`Fetching validators [NO:${operatorId}] from KAPI that will exit soon.`));

const url = new URL(urlpath, kapi).href;

const response = await fetch(url);

if (response.status !== 200) {
  console.log(chalk.red(`KAPI error`));
  console.log(chalk.red(`${await response.text()}`));
  process.exit(20);
}

const raw = await response.text();
const validatorsToExit = safeParseJson(raw);

if (!validatorsToExit || !validatorsToExit.data || !Array.isArray(validatorsToExit.data)) {
  console.log(chalk.red(`Bad JSON response from KAPI`));
  process.exit(30);
}

if (validatorsToExit.data.length < 1) {
  console.log(chalk.red(`No validators [NO:${operatorId}] for possible exit found.`));
  process.exit(40);
}

await $`mkdir -p ./input`;
await writeFile(`./input/validators-to-exit-no-${operatorId}.json`, JSON.stringify(validatorsToExit.data, null, ' '));

console.info(chalk.green(`Validators [NO:${operatorId}] for possible exit are fetched.`));
console.log(chalk.blue(JSON.stringify(validatorsToExit.data)));

