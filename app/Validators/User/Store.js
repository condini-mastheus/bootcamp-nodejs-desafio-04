'use strict'

const Antl = use('Antl')

class Store {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {
      email: 'normalize_email'
    }
  }

  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed' // must pass password_confirmation in request
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Store
