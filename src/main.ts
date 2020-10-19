import * as core from '@actions/core'
import {dappnodesdk} from '@dappnode/dappnodesdk'

async function run(): Promise<void> {
  const {releaseMultiHash} = await dappnodesdk.publish({
    type: process.env.RELEASE_TYPE ?? 'patch',
    dir: core.getInput('dir'),
    dappnode_team_preset: toBoolean(core.getInput('dappnode_team_preset')),
    eth_provider: core.getInput('eth_provider'),
    content_provider: core.getInput('content_provider'),
    timeout: core.getInput('timeout'),
    upload_to: 'ipfs',
    developer_address: core.getInput('developer_address')
  })

  core.info(`Release multihash: ${releaseMultiHash}`)
  core.setOutput('releaseMultiHash', releaseMultiHash)
}

function toBoolean(s: string | undefined): boolean | undefined {
  if (s === undefined) return undefined
  if (s === 'false' || s === 'FALSE') return false
  else return true
}

// eslint-disable-next-line github/no-then
run().catch(error => {
  core.error(error.stack)
  core.setFailed(error.message)
})
