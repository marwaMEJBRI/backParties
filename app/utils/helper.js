function passwordGenarator() {
  const pass =
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).toUpperCase().slice(2);
  return pass;
}

function usernameGenarator(name) {
  const userName =
    name.toLowerCase().split(" ").join("") +
    Math.random().toString(32).slice(4);

  return userName;
}

module.exports = {
  passwordGenarator: passwordGenarator,
  usernameGenarator: usernameGenarator
};
