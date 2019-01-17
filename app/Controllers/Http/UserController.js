'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

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

  async update ({ request, response, auth: { user } }) {
    const data = request.only(['name', 'password', 'old_password'])

    if (data.old_password) {
      const isEqual = await Hash.verify(data.old_password, user.password)

      if (!isEqual) {
        response.status(401).send({
          error: {
            message: 'Invalid password'
          }
        })
      }

      delete data.old_password
    }

    if (!data.password) {
      delete data.password
    }

    user.merge(data)

    await user.save()

    return user
  }
}

module.exports = UserController
