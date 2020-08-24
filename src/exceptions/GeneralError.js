class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    const BadRequest = require('./BadRequest');
    const NotFound = require('./NotFound');
    if (this instanceof BadRequest) {
      return 400;
    } if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

module.exports = GeneralError;
