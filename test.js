const TestRunner = require('test-runner')
const Cors = require('./')
const Lws = require('lws')
const request = require('req-then')

const runner = new TestRunner()

runner.test('simple', async function () {
  const port = 8000 + this.index
  const lws = new Lws()
  const server = lws.create({ port, stack: Cors })
  const response = await request(`http://localhost:${port}/`)
  server.close()
})