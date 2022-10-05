import ErrorHandler from "./ErrorHandler.js";
import validators from "../utilities/auth/validators.js";

const {
  emailValidator,
  nameValidator,
  passwordValidator,
  passwordMinLength,
  passwordMaxLength,
} = validators;

async function RegisterAuth(request, response, next) {
  const { email, name, password, repeatPassword } = request.body;
  const database = global.db.collection("profiles");
  let user = await database
    .find({ email: email })
    .collation({ locale: "en", strength: 2 })
    .toArray();
  if (user !== null && user !== undefined && user.length > 0) {
    return next(ErrorHandler.alreadyExists());
  }
  // Checking for empty fields
  if (!name || !email || !password || !repeatPassword) {
    return next(ErrorHandler.missingFieldsError());
  }
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof repeatPassword !== "string" ||
    typeof name !== "string"
  ) {
    return next(ErrorHandler.validationError());
  }
  if (
    email.toLowerCase().match(emailValidator) &&
    name.match(nameValidator) &&
    password.match(passwordValidator) &&
    password.length > passwordMinLength &&
    password.length < passwordMaxLength &&
    password === repeatPassword
  ) {
    return next();
  }
  return next(ErrorHandler.validationError());
}

export default RegisterAuth;
