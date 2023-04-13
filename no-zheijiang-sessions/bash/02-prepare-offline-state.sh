#!/bin/bash

# download offline state for testnet from Consensus Node
./ethdo validator exit --prepare-offline --connection=<!consensus_node> --timeout=300s --verbose --debug

# Example:
# ./ethdo validator exit --prepare-offline --connection=http://35.228.211.212:5052 --timeout=300s --verbose --debug