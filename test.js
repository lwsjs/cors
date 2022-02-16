import TestRunner from 'test-runner'
import Cors from 'lws-cors'
import Lws from 'lws'
import fetch from 'node-fetch'
import { strict as a } from 'assert'

const tom = new TestRunner.Tom()

tom.test('simple', async function () {
  const port = 8000 + this.index
  class One {
    middleware () {
      return function (ctx) {
        ctx.body = 'one'
      }
    }
  }
  const lws = await Lws.create({ port, stack: [ Cors, One ] })
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

export default tom
