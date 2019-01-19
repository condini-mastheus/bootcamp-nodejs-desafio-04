'use strict'

const Mail = use('Mail')

class SharedEventMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'SharedEventMail-job'
  }

  // This is where the work is done.
  async handle ({ email, name, event }) {
    console.log(`Job: ${SharedEventMail.key}`)

    Mail.send(['emails.shared_event'], { name, event }, message => {
      message
        .to(email)
        .from('desafio4@gonode.com', 'Desafio 4 | Adonis')
        .subject('Um novo evento foi compartilhado com você')
    })
  }
}

module.exports = SharedEventMail
