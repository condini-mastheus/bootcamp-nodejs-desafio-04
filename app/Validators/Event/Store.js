'use strict'

const Antl = use('Antl')
const { rule } = use('Validator')

class Store {
  get validateAll () {
    return true
  }

  get sanitizationRules () {
    return {}
  }

  get rules () {
    return {
      title: 'required',
      date: [rule('required'), rule('dateFormat', 'YYYY-MM-DD HH:mm:ss')]
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Store
