#!/usr/bin/env zx

import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

if (argv.help) {
  console.log(
    `Example: ./4-generate.mjs --password=12345678 --ethdo=./ethdo`
  );
  process.exit();
}

let { keystoresPath, password, ethdo, operatorId } = argv;

password = ''
ethdo = './ethdo'
keystoresPath = './input'

if (!keystoresPath) keystoresPath = await question('Keystores path, eg ./keystores/: ');
if (!password) password = await question('Keystore Password, eg 12345678: ');
if (!ethdo) ethdo = await question('ethdo binary, eg: ./ethdo: ');
if (!operatorId) { operatorId = await question('Operator ID, eg 1: '); }

if (!keystoresPath | !password || !ethdo || !operatorId) {
  console.error(chalk.red('Please provide all required parameters.'))
  process.exit()
}

if (!existsSync('./offline-preparation.json')) {
   console.log(chalk.red('No offline state data found. Please run `./prepare-offline-state.mjs`'));
   process.exit(1);
}

const pubkeysRaw = JSON.parse((await readFile(`./input/validators-to-exit-no-${operatorId}.json`)).toString());
const pubkeysToPrepare = pubkeysRaw.map(item => item.key);

console.log(pubkeysToPrepare);

for (const file of await glob(join(keystoresPath,'/*.json'))) {
  const pubKey = '0x' + JSON.parse((await readFile(file)).toString()).pubkey

  if (pubkeysToPrepare.indexOf(pubKey) === -1) {
    continue;
  }

  try {
    console.info(chalk.green('Doing', pubKey));

    // Importing keystore to ethdo
    await $`${ethdo} --base-dir=./temp wallet create --wallet=wallet`
    await $`${ethdo} --base-dir=./temp account import --account=wallet/account --keystore="${file}" --keystore-passphrase="${password}" --passphrase="123456789" --allow-weak-passphrases`

    // Generating an exit message, catching command output and writing to file
    const output =
      await $`${ethdo} --base-dir=./temp validator exit --account=wallet/account --passphrase="123456789" --json --verbose --debug --offline`
    await writeFile(`./output/${pubKey}.json`, output.stdout)

    // Cleaning up
    await $`${ethdo} --base-dir=./temp wallet delete --wallet=wallet`

    console.info(chalk.green('Done with', pubKey))
  } catch (e) {
    console.error(chalk.red(`Failed on ${pubKey}:`))
    console.error(chalk.red(e))
    await $`rm -rf ./temp/*`
  }
}

await $`rm offline-preparation.json`
console.info(chalk.green('Removed network state'))

console.info(chalk.green('Finished'))
