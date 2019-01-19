'use strict'

const Event = use('App/Models/Event')
const Kue = use('Kue')
const Job = use('App/Jobs/SharedEventMail')
const moment = require('moment')

class ShareEventController {
  async store ({ params, request, response, auth: { user } }) {
    const event = await Event.findOrFail(params.events_id)

    if (event.user_id !== user.id) {
      return response.status(401).send({
        error: {
          message: "You don't have access to share this event"
        }
      })
    }

    const email = request.input('email')

    event.date = moment(event.date).format('DD/MM/YYYY HH:mm:ss')

    Kue.dispatch(Job.key, { email, name: user.name, event }, { attempts: 3 })
  }
}

module.exports = ShareEventController
