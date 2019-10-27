import React, { Fragment, useState } from "react";
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
      console.log(formData);
      submitForm(formData, history);
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">User Form</h1>
      <p className="lead">
        {" "}
        Please fill the required information in order to apply{" "}
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
)(withRouter(UserForm));
