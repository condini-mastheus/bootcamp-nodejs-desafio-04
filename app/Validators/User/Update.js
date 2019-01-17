'use strict'

const Antl = use('Antl')

class Store {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {}
  }

  get rules () {
    return {
      name: 'required',
      password: 'confirmed', // must pass password_confirmation in request
      old_password: `required_if:password`
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Store
