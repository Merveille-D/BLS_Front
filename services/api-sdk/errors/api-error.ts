/**
 * ApiError class
 * @class ApiError
 * @extends {Error}
 *
 * @param {string} message - Error message
 *
 * @param {string | number} status - Error status code
 */
export default class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
