import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('TODO', async () => {
  expect(true).toBeTruthy()
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', async () => {
  const testDnpDirectory = './test-dnp'

  process.env['INPUT_DEVELOPER_ADDRESS'] =
    '0xf35960302a07022aba880dffaec2fdd64d5bf1c1'
  process.env['INPUT_DAPPNODE_TEAM_PRESET'] = 'false'
  process.env['INPUT_DIR'] = testDnpDirectory
  process.env['TESTING_ONLY_INIT_FIRST'] = 'true'

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
