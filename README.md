# Validator Exits Automation Snippets

Collection of example scripts to help with automation of validator exits.

## Scripts

- [keystores.mjs](https://github.com/lidofinance/validator-exits-automation-snippets/blob/main/keystores.mjs) - Mass exit message generation and signing from [keystores](https://eips.ethereum.org/EIPS/eip-2335) using [ethdo](https://github.com/wealdtech/ethdo)
- [web3signer.mjs](https://github.com/lidofinance/validator-exits-automation-snippets/blob/main/web3signer.mjs) - Exit message generation and signing using [Web3Signer](https://github.com/ConsenSys/web3signer)
- [kapiValidation.mjs](https://github.com/lidofinance/validator-exits-automation-snippets/blob/main/kapiValidation.mjs) - [KAPI](https://github.com/lidofinance/lido-keys-api) response data validation for two [pre-signing endpoints](https://github.com/lidofinance/lido-keys-api#validators)
- [no-zheijiang-sessions/](https://github.com/lidofinance/validator-exits-automation-snippets/blob/main/no-zheijiang-sessions/) - Scripts that were used on Validator Exits Zheijiang Walkthrough Sessions with Node Operators

## Community Scripts

- [validator-exit-pre-signer](https://github.com/chainlayer/validator-exit-pre-signer) - [keystores.mjs](https://github.com/lidofinance/validator-exits-automation-snippets/blob/main/keystores.mjs) Python alternative by [@jonastra](https://github.com/jonastra) from [ChainLayer](https://github.com/chainlayer)
- [Lido Withdrawals Automation](https://github.com/Stakely/lido-withdrawals-automation) - CLI for E2E messages preparation for the Ejector: getting validator info from KAPI, generating exit messages, signing using Web3Signer and encrypting exit message files by [Stakely.io](https://stakely.io/)
