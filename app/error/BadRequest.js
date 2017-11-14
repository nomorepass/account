class BadRequestError extends Error {
  get status () {
    return 400
  }
}

module.exports = BadRequestError
