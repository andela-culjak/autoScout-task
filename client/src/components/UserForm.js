import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { submitForm } from "../actions/form";
import PropTypes from "prop-types";

const UserForm = ({ submitForm }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    terms: false,
    firstNameError: "",
    lastNameError: "",
    addressError: "",
    phoneError: "",
    emailError: "",
    termsError: ""
  });

  const {
    firstName,
    lastName,
    address,
    phone,
    email,
    terms,
    firstNameError,
    lastNameError,
    addressError,
    phoneError,
    emailError,
    termsError
  } = formData;

  const validate = () => {
    let isError = false;

    const errors = {
      firstNameError: "",
      lastNameError: "",
      addressError: "",
      phoneError: "",
      emailError: "",
      termsError: ""
    };

    //downloaded, allows numbers without national code eg. +000
    //const regexPhone = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s]?[(]?[0-9]{1,3}[)]?([-\s]?[0-9]{3})([-\s]?[0-9]{3,4})/;

    // homemade regex, checks if its in form of +0000000000, accepts whitespaces
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
      errors.phoneError =
        "Bad phone format, please enter in form of +0000000000";
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

    setFormData({
      ...formData,
      ...errors
    });

    return isError;
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    const err = validate();

    if (!err) {
      //why is this async and wont work without thunk?
      submitForm({ firstName, lastName, address, phone, email, terms });
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        email: "",
        terms: false,
        firstNameError: "",
        lastNameError: "",
        addressError: "",
        phoneError: "",
        emailError: "",
        termsError: ""
      });
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">User Form</h1>
      <p className="lead">
        <i className="fas fa-user" /> Please fill out required information
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Fist Name"
            name="firstName"
            value={firstName}
            onChange={e => onChange(e)}
          />
          {firstNameError.length > 0 && (
            <span className="error">{firstNameError}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={e => onChange(e)}
          />
          {lastNameError.length > 0 && (
            <span className="error">{lastNameError}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={address}
            onChange={e => onChange(e)}
          />
          {addressError.length > 0 && (
            <span className="error">{addressError}</span>
          )}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={e => onChange(e)}
          />
          {phoneError.length > 0 && <span className="error">{phoneError}</span>}
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
          {emailError.length > 0 && <span className="error">{emailError}</span>}
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="terms"
              checked={terms}
              value={terms}
              onChange={() => {
                setFormData({ ...formData, terms: !terms });
              }}
            />{" "}
            I agree to Terms and Conditions
          </p>
          {termsError.length > 0 && <span className="error">{termsError}</span>}
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    </Fragment>
  );
};

UserForm.propTypes = {
  submitForm: PropTypes.func.isRequired
};

export default connect(
  null,
  { submitForm }
)(UserForm);
