import * as core from '@actions/core'
import {dappnodesdk} from '@dappnode/dappnodesdk'

async function run(): Promise<void> {
  const developer_address: string = core.getInput('developer_address')
  if (developer_address)
    core.info(`Set developer_address: ${developer_address}`)

  const {
    RELEASE_TYPE,
    RELEASE_DIR,
    DAPPNODE_TEAM_PRESET,
    ETH_PROVIDER,
    CONTENT_PROVIDER,
    UPLOAD_TO,
    BUILD_TIMEOUT,
    DEVELOPER_ADDRESS
  } = process.env

  const {releaseMultiHash} = await dappnodesdk.publish({
    type: RELEASE_TYPE ?? 'patch',
    dir: RELEASE_DIR ?? './',
    dappnode_team_preset: toBoolean(DAPPNODE_TEAM_PRESET) ?? true,
    eth_provider: ETH_PROVIDER ?? 'remote',
    content_provider: CONTENT_PROVIDER ?? 'remote',
    timeout: BUILD_TIMEOUT ?? '60min',
    upload_to: UPLOAD_TO ?? 'ipfs',
    developer_address: DEVELOPER_ADDRESS
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
