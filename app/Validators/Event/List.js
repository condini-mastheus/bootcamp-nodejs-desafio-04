'use strict'

const Antl = use('Antl')
const { rule } = use('Validator')

class List {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {}
  }

  get rules () {
    return {
      date: [rule('dateFormat', 'YYYY-MM-DD')]
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = List
