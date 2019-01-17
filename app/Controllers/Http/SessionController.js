'use strict'

class SessionController {
  async store ({ request, auth }) {
    const { email, password } = request.only(['email', 'password'])

    const user = await auth.attempt(email, password)

    return user
  }
}

module.exports = SessionController
