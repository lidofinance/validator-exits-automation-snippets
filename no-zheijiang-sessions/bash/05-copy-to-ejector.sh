#!/bin/bash


# copying encrypted pre-signed messages to machine with validator-ejector
scp -i <!key_path> \
   ./output-encrypted/*.json \
   <user>@<host>:/srv/validator-ejector/messages/ # <-- remote path to validator-ejector volume with messages

# Example:
scp -i /home/infloop/Github/Lido/p2p-tools/p2p-keys/infloop \
   ./output-encrypted/*.json \
   infloop@35.228.211.212:/srv/testnet-validator-ejector-shadow/messages/