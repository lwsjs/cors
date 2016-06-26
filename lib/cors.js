'use strict'

class Cors {
  middleware (options) {
    const kcors = require('kcors')
    return kcors()
  }
}

module.exports = Cors
