class UnauthorizedError extends Error {
  get status () {
    return 401
  }

  get message () {
    return 'unauthorized client or scope in request.'
  }
}

module.exports = UnauthorizedError
