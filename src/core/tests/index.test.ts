import SwapApp from './setupSwapApp'
// @ToDo - use common/utils/coin/btc
// @ts-ignore
import Bitcoin from './../simple/src/instances/bitcoin'
import bitcoinjs from 'bitcoinjs-lib'
import { BtcSwap } from 'swap.swaps'

const log = console.log
const crypto = {
  ripemd160: (secret) => 'c0933f9be51a284acb6b1a6617a48d795bdeaa80',
}

const secret = 'c0809ce9f484fdcdfb2d5aabd609768ce0374ee97a1a5618ce4cd3f16c00a078'
const secretHash = 'c0933f9be51a284acb6b1a6617a48d795bdeaa80'
const lockTime = 1521171580

const btcOwner = {
  privateKey: 'cRkKzpir8GneA48iQVjSpUGT5mopFRTGDES7Kb43JduzrbhuVncn',
  publicKey: '02b65eed68f383178ee4bf301d1a2d231194eba2a65969187d49a6cdd945ea4f9d',
}
const ethOwner = {
  privateKey: 'cT5n9yx1xw3TcbvpEAuXvzhrTb5du4RAYbAbTqHfZ9nbq6gJQMGn',
  publicKey: '02dfae561eb061072da126f1aed7d47202a36b762e89e913c400cdb682360d9620',
}

const btcOwnerBitcoin = new Bitcoin()
const ethOwnerBitcoin = new Bitcoin()

const btcSwap = new BtcSwap({
  fetchBalance: (addr) => btcOwnerBitcoin.fetchBalance(addr),
  fetchUnspents: (addr) => btcOwnerBitcoin.fetchUnspents(addr),
  broadcastTx: (tx) => btcOwnerBitcoin.broadcastTx(tx),
})

//@ts-ignore: strictNullChecks
const swapAppInstance = SwapApp.shared()
console.log('swapAppInstance =', swapAppInstance)
btcSwap._initSwap(swapAppInstance)

const btcOwnerData = btcOwnerBitcoin.login(btcOwner.privateKey)
const ethOwnerData = ethOwnerBitcoin.login(ethOwner.privateKey)

test('check secretHash generated by ripemd160', () => {
  const result = crypto.ripemd160(secret)
  const expected = secretHash

  expect(result).toBe(expected)
})

test('create script', async () => {
  const result = btcSwap.createScript({
    secretHash,
    ownerPublicKey: btcOwner.publicKey,
    recipientPublicKey: ethOwner.publicKey,
    lockTime,
  })

  const expected = {
    address: '35ooKXKr7sHZvtmnw9b4bPRucPUKA8gdhN',
  }

  expect(result.scriptAddress).toBe(expected.address)
})

//
// test('create + fund + withdraw', async () => {
//   const result = btcSwap.createScript({
//     secretHash,
//     ownerPublicKey: btcOwner.publicKey,
//     recipientPublicKey: ethOwner.publicKey,
//     lockTime,
//   })
//
//   const { script, scriptAddress } = result
//
//   log('\nCreate complete')
//   log({ script, lockTime })
//
//   const fundResult = await btcSwap.fundScript({ btcData: btcOwnerData, script, lockTime, amount: 0.001 })
//
//   log('\nFund complete')
//   log(fundResult)
//
//   const withdrawResult = await btcSwap.withdraw({ btcData: ethOwnerData, script, secret })
//
//   log('\nWithdraw complete')
//   log(withdrawResult)
// })
