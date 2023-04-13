#!/bin/bash

docker run \
    -e MESSAGES_PASSWORD=<!messages_password> \
    -v ${PWD}/output:/app/encryptor/input/ \
    -v ${PWD}/output-encrypted:/app/encryptor/output/ \
    lidofinance/validator-ejector@sha256:e5768026ddec080faa6d0ff27d3b043bc874855fbbd38d4f9789bea14dcf8592 \
    node /app/dist/encryptor/encrypt.js

# Example:
#docker run \
#    -e MESSAGES_PASSWORD=pass \
#    -v ${PWD}/output:/app/encryptor/input/ \
#    -v ${PWD}/output-encrypted:/app/encryptor/output/ \
#    lidofinance/validator-ejector@sha256:e5768026ddec080faa6d0ff27d3b043bc874855fbbd38d4f9789bea14dcf8592 \
#    node /app/dist/encryptor/encrypt.js
