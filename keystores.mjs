#!/usr/bin/env zx

/**
This example uses zx:
https://github.com/google/zx

You need to have it installed and run the script using:
zx keystores.mjs
or
./keystores.mjs
**/

// Folder structure:
// ./keystores
// ./output
// ./temp
// ./keystores.mjs

import { readFile, writeFile } from 'fs/promises'

if (argv.help) {
  console.log(
    `Example: ./generate.mjs --password=12345678 --node=http://127.0.0.1:5052 --ethdo=./ethdo`
  )
  process.exit()
}

let { password, node, ethdo } = argv

if (!password) password = await question('Keystore Password, eg 12345678: ')
if (!node) node = await question('Consensus Node, eg: http://127.0.0.1:5052: ')
if (!ethdo) ethdo = await question('ethdo binary, eg: ./ethdo: ')

if (!password || !node || !ethdo) {
  console.error(chalk.red('Please provide all required parameters.'))
  process.exit()
}

console.info(chalk.green('Fetching network state'))
await $`${ethdo} validator exit --prepare-offline --connection=${node} --timeout=300s --verbose --debug`
console.info(chalk.green('Network state fetched'))

for (const file of await glob('./keystores/*.json')) {
  const pubKey = '0x' + JSON.parse((await readFile(file)).toString()).pubkey

  try {
    console.info(chalk.green('Doing', pubKey))

    // Importing keystore to ethdo
    await $`${ethdo} --base-dir=./temp wallet create --wallet=wallet`
    await $`${ethdo} --base-dir=./temp account import --account=wallet/account --keystore="${file}" --keystore-passphrase="${password}" --passphrase=pass --allow-weak-passphrases`

    // Generating an exit message, catching command output and writing to file
    const output =
      await $`${ethdo} --base-dir=./temp validator exit --account=wallet/account --passphrase=pass --json --verbose --debug --offline`
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
