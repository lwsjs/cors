'use strict'

class Cors {
  optionDefinitions () {
    return [
      {
        name: 'cors.origin',
        description: 'Access-Control-Allow-Origin value. Default is request Origin header.'
      },
      {
        name: 'cors.allow-methods',
        description: 'Access-Control-Allow-Methods value. Default is "GET,HEAD,PUT,POST,DELETE,PATCH"'
      },
    ]
  }
  middleware (options) {
    options = options || {}
    const kcors = require('kcors')
    return kcors({
      origin: options['cors.origin'],
      allowMethods: options['cors.allow-methods']
    })
  }
}

module.exports = Cors
