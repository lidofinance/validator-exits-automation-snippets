#!/bin/bash

# create a new wallet
./ethdo --base-dir=./temp wallet create --wallet=wallet

# add keys from a keystore
./ethdo --base-dir=./temp account import --account=wallet/account --keystore=./input/<!keystore> --keystore-passphrase=123456789 --passphrase=glorious#alpaca

# Examples:
#./ethdo --base-dir=./temp account import --account=wallet/account1 --keystore=./input/ --keystore-passphrase=123456789 --passphrase=glorious#alpaca
#./ethdo --base-dir=./temp account import --account=wallet/account2 --keystore=./input/ --keystore-passphrase=123456789 --passphrase=glorious#alpaca


# generating offline pre-signed message
./ethdo --base-dir=./temp validator exit --account=wallet/account --passphrase=glorious#alpaca --json --offline > ./output/account.json

# Examples:
#./ethdo --base-dir=./temp validator exit --account=wallet/account1 --passphrase=glorious#alpaca --json --offline > ./output/account1.json
#./ethdo --base-dir=./temp validator exit --account=wallet/account2 --passphrase=glorious#alpaca --json --offline > ./output/account2.json

# cleanup - remove wallet
./ethdo --base-dir=./temp wallet delete --wallet=wallet