function usernameGenerator(name, email, password) {
  const nameSlice = name.slice(0, 2).toLowerCase();
  const nameLength = name.length;
  const emailLength = email.length;
  const passwordLength = password.length;
  const usernameDigit =
    nameLength *
    emailLength *
    passwordLength *
    Math.floor(Math.random() * (new Date().getTime() / 100000000));
  return nameSlice + usernameDigit;
}

export default usernameGenerator;
