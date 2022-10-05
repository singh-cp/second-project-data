import { DEBUG_MODE } from "../config/index.js";

class ErrorHandler extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
  static validationError(message = "Given inputs failed validation") {
    return new ErrorHandler(400, message);
  }
  static notFoundError(message = "Not found") {
    return new ErrorHandler(404, message);
  }
  static serverError(message = "Internal error") {
    return new ErrorHandler(500, message);
  }
  static forbiddenError(message = "Unauthorized Request") {
    return new ErrorHandler(403, message);
  }

  static missingFieldsError(message = "Missing required field(s)") {
    return new ErrorHandler(400, message);
  }
  static alreadyExists(message = "Records already exist") {
    return new ErrorHandler(409, message);
  }
  static emailPasswordError(message = "Invalid email or password") {
    return new ErrorHandler(401, message);
  }
  static registrationError(message = "Registration Failed") {
    return new ErrorHandler(400, message);
  }
}

export default ErrorHandler;
