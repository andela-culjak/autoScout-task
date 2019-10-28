import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { submitForm } from "../actions/form";
import { validate } from "../validate";
import PropTypes from "prop-types";

const UserForm = ({ submitForm, history }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    terms: false
  });

  const [formErrors, setFormErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    addressError: "",
    phoneError: "",
    emailError: "",
    termsError: ""
  });

  const { firstName, lastName, address, phone, email, terms } = formData;

  const {
    firstNameError,
    lastNameError,
    addressError,
    phoneError,
    emailError,
    termsError
  } = formErrors;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    const { errors, isError } = validate(formData);

    setFormErrors({
      ...formErrors,
      ...errors
    });
    if (!isError) {
      submitForm(formData, history);
    }
  };

  return (
    <div className="wrapper">
      <div className="title-container">
        <h1 className="xx-large text-light">2019</h1>
        <h1 className="x-large">autumn</h1>
        <br />
        <h1 className="x-large">camp</h1>
      </div>
      <div className="user-form">
        <h1 className="large text-primary">Apply here</h1>
        <p className="lead"> Please enter required information </p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={firstName}
              onChange={e => onChange(e)}
            />
            {firstNameError.length > 0 ? (
              <span className="text-error">{firstNameError}</span>
            ) : (
              <span className="text-error hidden"> hidden </span>
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
            {lastNameError.length > 0 ? (
              <span className="text-error">{lastNameError}</span>
            ) : (
              <span className="text-error hidden"> hidden </span>
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
            {addressError.length > 0 ? (
              <span className="text-error">{addressError}</span>
            ) : (
              <span className="text-error hidden"> hidden </span>
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
            {phoneError.length > 0 ? (
              <span className="text-error">{phoneError}</span>
            ) : (
              <span className="text-error hidden"> hidden </span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
            {emailError.length > 0 ? (
              <span className="text-error">{emailError}</span>
            ) : (
              <span className="text-error hidden"> hidden </span>
            )}
          </div>
          <div className="form-group">
            <p className="text-error">
              <input
                type="checkbox"
                name="terms"
                checked={terms}
                value={terms}
                onChange={() => {
                  setFormData({ ...formData, terms: !terms });
                }}
              />{" "}
              I am over 18 and take full responsibility
            </p>
            {termsError.length > 0 ? (
              <span className="text-error">{termsError}</span>
            ) : (
              <span className="text-error hidden"> hidden </span>
            )}
          </div>
          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      </div>
    </div>
  );
};

UserForm.propTypes = {
  submitForm: PropTypes.func.isRequired
};

export default connect(
  null,
  { submitForm }
)(withRouter(UserForm));
