'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up () {
    this.table('users', table => {
      table.dropColumn('username')
      table.string('name', 100).notNullable()
    })
  }

  down () {
    this.table('users', table => {
      this.drop('users')
    })
  }
}

module.exports = UsersSchema
