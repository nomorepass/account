class BadRequestError extends Error {
  get status () {
    return 400
  }

  get name () {
    return this.constructor.name
  }
}

module.exports = BadRequestError
