import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {dappnodesdk} from '@dappnode/dappnodesdk'

test('TODO', async () => {
  expect(true).toBeTruthy()
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', async () => {
  const testDnpDirectory = './test-dnp'

  // Initialize a lightweight DNP in this directory
  const manifest = await dappnodesdk.init({
    yes: true,
    force: true,
    dir: testDnpDirectory
  })
  console.log(`Initialized test DNP: ${manifest.name} ${manifest.version}`)

  process.env['DEVELOPER_ADDRESS'] =
    '0xf35960302a07022aba880dffaec2fdd64d5bf1c1'
  process.env['DAPPNODE_TEAM_PRESET'] = 'false'
  process.env['RELEASE_DIR'] = testDnpDirectory

  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecSyncOptions = {
    env: process.env
  }
  try {
    console.log(cp.execSync(`node ${ip}`, options).toString())
  } catch (e) {
    console.error(`Error running main.js\n${e.stdout.toString()}`)
    throw e
  }
})
