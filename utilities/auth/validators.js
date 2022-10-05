const validators = {
  emailValidator:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  nameValidator: /^[a-zA-Z ]+.{3,40}$/,
  passwordValidator: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
  passwordMinLength: 8,
  passwordMaxLength: 20,
};

export default validators;
