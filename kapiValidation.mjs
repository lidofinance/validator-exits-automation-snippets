const STAKING_MODULE_ID = 1
const OPERATOR_ID = 1

const KAPI_INFO_ENDPOINT = `https://keys-api.testnet.fi/v1/modules/${STAKING_MODULE_ID}/validators/validator-exits-to-prepare/`
const KAPI_MESSAGES_ENDPOINT = `https://keys-api.testnet.fi/v1/modules/${STAKING_MODULE_ID}/validators/generate-unsigned-exit-messages/`

const validateObjectKeys = (object, keys) => {
  if (Object.keys(object).toString() === keys.toString()) {
    console.log('Validation passed for item')
  } else {
    console.log('Invalid item with keys:', Object.keys(object))
  }
}

console.log('Sending KAPI validator info request')

const infoReq = await fetch(KAPI_INFO_ENDPOINT + OPERATOR_ID)
const infoRes = await infoReq.json()

const infoObjectKeys = ['validatorIndex', 'key']
infoRes.data.forEach((item) => validateObjectKeys(item, infoObjectKeys))

console.log('Sending KAPI exit messages request')

const messagesReq = await fetch(KAPI_MESSAGES_ENDPOINT + OPERATOR_ID)
const messagesRes = await messagesReq.json()

const messagesObjectKeys = ['validator_index', 'epoch']
messagesRes.data.forEach((item) => validateObjectKeys(item, messagesObjectKeys))

console.log('Done')
