const Tom = require('test-runner').Tom
const Cors = require('./')
const Lws = require('lws')
const fetch = require('node-fetch')
const a = require('assert').strict

const tom = module.exports = new Tom()

tom.test('simple', async function () {
  const port = 8000 + this.index
  class One {
    middleware () {
      return function (ctx) {
        ctx.body = 'one'
      }
    }
  }
  const lws = Lws.create({ port, stack: [ Cors, One ] })
  const response = await fetch(`http://localhost:${port}/`, {
    method: 'OPTIONS',
    headers: {
      'origin': 'localhost',
      'Access-Control-Request-Method': 'GET'
    }
  })
  const body = await response.text()
  a.equal(body, '')
  a.deepEqual(response.headers.get('access-control-allow-methods'), 'GET,HEAD,PUT,POST,DELETE,PATCH' )
  lws.server.close()
})
