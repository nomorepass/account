class ForbiddenError extends Error {
  get status () {
    return 403
  }
}

module.exports = ForbiddenError
