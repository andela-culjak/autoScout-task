export const validate = ({
  firstName,
  lastName,
  address,
  phone,
  email,
  terms
}) => {
  let isError = false;

  const errors = {
    firstNameError: "",
    lastNameError: "",
    addressError: "",
    phoneError: "",
    emailError: "",
    termsError: ""
  };

  //allows numbers without national code eg. +000
  //const regexPhone = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s]?[(]?[0-9]{1,3}[)]?([-\s]?[0-9]{3})([-\s]?[0-9]{3,4})/;

  // checks if form of +0000000000, accepts whitespaces
  const regexPhone = /^\+[\d\s]{8,25}$/gi;
  const regexEmail = /^(([^<>()\],;:\s@]+(\.[^<>()\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+\.)+[^<>()[\],;:\s@]{2,})$/i;

  if (firstName.length < 1) {
    isError = true;
    errors.firstNameError = "First name required";
  }
  if (lastName.length < 1) {
    isError = true;
    errors.lastNameError = "Last name required";
  }
  if (address.length < 1) {
    isError = true;
    errors.addressError = "Address required";
  }
  if (phone.length < 1) {
    isError = true;
    errors.phoneError = "Phone required";
  } else if (!regexPhone.test(phone)) {
    isError = true;
    errors.phoneError = "Bad phone format, please enter in form of +0000000000";
  }
  if (email.length < 1) {
    isError = true;
    errors.emailError = "Email required";
  } else if (!regexEmail.test(email)) {
    isError = true;
    errors.emailError = "Bad email format";
  }
  if (terms === false) {
    isError = true;
    errors.termsError = "Must accept terms and conditions";
  }

  return { isError, errors };
};
