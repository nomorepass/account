class ForbiddenError extends Error {
  get status () {
    return 403
  }

  get name () {
    return this.constructor.name
  }
}

module.exports = ForbiddenError
