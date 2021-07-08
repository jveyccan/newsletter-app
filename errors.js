
  class ResourceNotFound extends Error {
    constructor({ resource, message }) {
      const _message = resource ? `the requested ${resource} was not found` : message;
      super(_message);
      this.name = 'ResourceNotFound';
      this.statusCode = 404;
    }
  }

  
  
  module.exports = {
    ResourceNotFound,
  }