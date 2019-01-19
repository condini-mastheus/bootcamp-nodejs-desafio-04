'use strict'

const Antl = use('Antl')

class Shared {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {}
  }

  get rules () {
    return {
      email: 'required|email'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Shared
