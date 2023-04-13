#!/bin/bash

# get state of validator from consensus node
curl http://<!consensus_node>/eth/v1/beacon/states/head/validators/<!validator_index>

# Example:
# curl http://35.228.211.212:5052/eth/v1/beacon/states/head/validators/65336
