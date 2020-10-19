import * as core from '@actions/core'
import {dappnodesdk} from '@dappnode/dappnodesdk'

async function run(): Promise<void> {
  try {
    const developer_address: string = core.getInput('developer_address')
    if (developer_address)
      core.info(`Set developer_address: ${developer_address}`)

    const {releaseMultiHash} = await dappnodesdk.publish({
      type: 'patch',
      dir: './',
      dappnode_team_preset: true,
      eth_provider: 'remote',
      content_provider: 'remote',
      timeout: '60min',
      upload_to: 'ipfs',
      developer_address
    })

    core.info(`Release multihash: ${releaseMultiHash}`)
    core.setOutput('releaseMultiHash', releaseMultiHash)
  } catch (error) {
    core.error(error.stack)
    core.setFailed(error.message)
  }
}

run()
