'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const { name, email, password } = request.only([
      'name',
      'email',
      'password'
    ])

    const user = await User.create({ name, email, password })

    return user
  }
}

module.exports = UserController
