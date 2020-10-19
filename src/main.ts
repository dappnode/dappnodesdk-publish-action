import * as core from '@actions/core'
import {dappnodesdk} from '@dappnode/dappnodesdk'

async function run(): Promise<void> {
  if (process.env.TESTING_ONLY_INIT_FIRST) {
    await dappnodesdk.init({
      yes: true,
      force: true,
      dir: core.getInput('dir') || './'
    })
  }

  const {releaseMultiHash} = await dappnodesdk.publish({
    type: process.env.RELEASE_TYPE || 'patch',
    dir: core.getInput('dir') || './',
    dappnode_team_preset: toBoolean(core.getInput('dappnode_team_preset')),
    eth_provider: core.getInput('eth_provider') || 'remote',
    content_provider: core.getInput('content_provider') || 'remote',
    timeout: core.getInput('timeout') || '60min',
    upload_to: 'ipfs',
    developer_address: core.getInput('developer_address')
  })

  core.info(`Release multihash: ${releaseMultiHash}`)
  core.setOutput('releaseMultiHash', releaseMultiHash)
}

function toBoolean(s: string | undefined): boolean | undefined {
  if (s === 'false' || s === 'FALSE') return false
  else if (s) return true
  else return undefined
}

// eslint-disable-next-line github/no-then
run().catch(error => {
  core.error(error.stack)
  core.setFailed(error.message)
})
