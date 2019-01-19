'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Event = use('App/Models/Event')
const moment = require('moment')

/**
 * Resourceful controller for interacting with events
 */
class EventController {
  /**
   * Show a list of all events.
   * GET events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, auth: { user } }) {
    const { page = 1, date } = request.only(['page', 'date'])

    let query = Event.query()
      .with('user')
      .where('user_id', user.id)

    if (date) {
      query = query.whereRaw('DATE(date) = ?', date)
    }

    const events = await query.paginate(page)

    return events
  }

  /**
   * Create/save a new event.
   * POST events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth: { user } }) {
    const { title, location, date } = request.only([
      'title',
      'location',
      'date'
    ])

    const hasPassedDate = moment().isAfter(date)

    if (hasPassedDate) {
      return response.status(401).send({
        error: {
          message: "You can't set a date that already passed"
        }
      })
    }

    const events = await Event.query()
      .where('date', date)
      .where('user_id', user.id)
      .fetch()

    if (events.rows.length > 0) {
      return response.status(401).send({
        error: {
          message: "Can't create an event at the same date than other"
        }
      })
    }

    const event = await Event.create({
      user_id: user.id,
      title,
      location,
      date
    })

    return event
  }

  /**
   * Display a single event.
   * GET events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response, auth: { user } }) {
    const event = await Event.findOrFail(params.id)

    if (user.id !== event.user_id) {
      return response.status(401).send({
        error: {
          message: "You don't have access to see this event"
        }
      })
    }

    return event
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth: { user } }) {
    const { title, location, date } = request.only([
      'title',
      'location',
      'date'
    ])

    const event = await Event.findOrFail(params.id)

    if (user.id !== event.user_id) {
      return response.status(401).send({
        error: {
          message: "You don't have access to edit this event"
        }
      })
    }

    const hasPassed = moment().isAfter(event.date)

    if (hasPassed) {
      return response.status(401).send({
        error: {
          message: "You can't edit events that already passed"
        }
      })
    }

    const hasPassedDate = moment().isAfter(date)

    if (hasPassedDate) {
      return response.status(401).send({
        error: {
          message: "You can't set a date that already passed"
        }
      })
    }

    event.merge({ title, location, date })

    await event.save()

    return event
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth: { user } }) {
    const event = await Event.findOrFail(params.id)

    if (user.id !== event.user_id) {
      return response.status(401).send({
        error: {
          message: "You don't have access to delete this event"
        }
      })
    }

    const hasPassed = moment().isAfter(event.date)

    if (hasPassed) {
      return response.status(401).send({
        error: {
          message: "You can't delete events that already passed"
        }
      })
    }

    await event.delete()
  }
}

module.exports = EventController
