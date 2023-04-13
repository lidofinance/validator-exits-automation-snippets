const VALIDATOR_INDEX = 123
const VALIDATOR_PUBLIC_KEY = '0x123'

const WEB3SIGNER = 'http://127.0.0.1:9000'
const WEB3SIGNER_ENDPOINT = `${WEB3SIGNER}/api/v1/eth2/sign/${VALIDATOR_PUBLIC_KEY}`

const CONSENSUS_NODE = 'http://127.0.0.1:5051'
const CONSENSUS_BLOCK_ENDPOINT = `${CONSENSUS_NODE}/eth/v2/beacon/blocks/head`
const CONSENSUS_FORK_ENDPOINT = `${CONSENSUS_NODE}/eth/v1/beacon/states/finalized/fork`
const CONSENSUS_GENESIS_ENDPOINT = `${CONSENSUS_NODE}/eth/v1/beacon/genesis`

const blockReq = await fetch(CONSENSUS_BLOCK_ENDPOINT)
const blockRes = await blockReq.json()
const blockNumber = blockRes.data.message.slot
const currentEpoch = Math.floor(blockNumber / 32)

const forkReq = await fetch(CONSENSUS_FORK_ENDPOINT)
const forkRes = await forkReq.json()
const fork = forkRes.data

const genesisReq = await fetch(CONSENSUS_GENESIS_ENDPOINT)
const genesisRes = await genesisReq.json()
const genesis_validators_root = genesisRes.data.genesis_validators_root

const voluntaryExit = {
  epoch: String(currentEpoch),
  validator_index: String(VALIDATOR_INDEX),
}

const body = {
  type: 'VOLUNTARY_EXIT',
  fork_info: {
    fork,
    genesis_validators_root,
  },
  voluntary_exit: voluntaryExit,
}

const signerReq = await fetch(WEB3SIGNER_ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify(body),
})
const signature = await signerReq.text()

const signedMessage = {
  message: voluntaryExit,
  signature,
}

console.log(signedMessage)
