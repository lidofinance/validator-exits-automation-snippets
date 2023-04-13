#!/bin/bash

# getting oldest keys to exit from KAPI
curl http://zhejiang-keys-api.testnet.fi/v1/modules/1/validators/validator-exits-to-prepare/<!nodeOperatorId>?percent=20

# Example:
# curl http://zhejiang-keys-api.testnet.fi/v1/modules/1/validators/validator-exits-to-prepare/1?percent=20