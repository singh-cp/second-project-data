import ErrorHandler from "./ErrorHandler.js";
import validators from "../utilities/auth/validators.js";

const {
  emailValidator,
  passwordValidator,
  passwordMinLength,
  passwordMaxLength,
} = validators;

async function LoginAuth(request, response, next) {
  const { email, password } = request.body;
  if (!email || !password) {
    return next(ErrorHandler.missingFieldsError());
  }
  if (
    email.toLowerCase().match(emailValidator) &&
    password.length > passwordMinLength &&
    password.length < passwordMaxLength &&
    password.match(passwordValidator)
  ) {
    return next();
  }
  return next(ErrorHandler.validationError());
}

export default LoginAuth;
