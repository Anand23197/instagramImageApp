const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function isEmailAddress(str) {
  return str.match(pattern);
}

const signUpFormValidation = (dataName, value) => {
  const error = {};
  if (value === "") error[dataName] = `${dataName} is required`;
  if (dataName === "email" && isEmailAddress(value) === null) {
    error[dataName] = "not valid email";
  }
  return error;
};

export { signUpFormValidation };
