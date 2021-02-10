import React, { useState } from "react";
import Dropdown from "./Dropdown";

// rendering form
const Form = () => {
  const title = "Contact Us";
  const subtitle =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const checkboxTitle = "Please select at least one of the following:";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [checkbox, setCheckbox] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  const [validationError, setError] = useState({
    nameError: "",
    emailError: "",
    phoneError: "",
    checkbox: "",
  });

  // handle user inputs - feed useStates
  const handleInput = (e) => {
    switch (e.target.name) {
      case "name":
        return setName(e.target.value);
      case "email":
        return setEmail(e.target.value);
      case "phone":
        return setPhone(e.target.value);
      case "message":
        return setMessage(e.target.value);
      case "checkbox1":
        return setCheckbox((prevCheckbox) => ({
          checkbox1: e.target.checked,
          checkbox2: prevCheckbox.checkbox2,
        }));
      case "checkbox2":
        return setCheckbox((prevCheckbox) => ({
          checkbox1: prevCheckbox.checkbox1,
          checkbox2: e.target.checked,
        }));
      default:
        return null;
    }
  };

  // initial validation rules
  const validation = {
    name: /^[^-\s][a-zA-Z ]*$/,
    email: /^[a-z0-9.]+(@spitogatos.gr)$/,
    phone: /^[0-9]{10}$/,
  };

  const nameRegex = new RegExp(validation.name);
  const emailRegex = new RegExp(validation.email);
  const phoneRegex = new RegExp(validation.phone);

  // handle Form submition and make the validations
  const handleFormSubmition = (e) => {
    e.preventDefault();

    const intermediaryErrors = {
      nameError: validationError.nameError,
      emailError: validationError.emailError,
      phoneError: validationError.phoneError,
      checkboxError: validationError.checkbox,
    };

    if (nameRegex.test(name)) {
      intermediaryErrors.nameError = "";
    } else {
      intermediaryErrors.nameError =
        "Please provide a name not starting with space and with only latin characters";
    }

    if (emailRegex.test(email)) {
      intermediaryErrors.emailError = "";
    } else {
      intermediaryErrors.emailError =
        "Please provide a valid email (i.e. <your input>@spitogatos.gr)";
    }

    if (phoneRegex.test(phone)) {
      intermediaryErrors.phoneError = "";
    } else {
      intermediaryErrors.phoneError =
        "Please provide a number of 10 digits (i.e. 0123456789)";
    }

    if (!(checkbox.checkbox1 === false && checkbox.checkbox2 === false)) {
      intermediaryErrors.checkboxError = "";
    } else {
      intermediaryErrors.checkboxError = "Please select at least one option";
    }

    setError(intermediaryErrors);
  };

  // handle info messages regarding user input
  const subInfo = (infoForWhat) => {
    const helpInfo = <div className="input-info">Help Info</div>;
    const requiredField = (
      <div className="input-info">This field is required</div>
    );

    switch (infoForWhat) {
      case "name":
        if (validationError.nameError)
          return <div className="input-error">{validationError.nameError}</div>;
        else return name.length > 0 ? helpInfo : requiredField;
      case "email":
        if (validationError.emailError)
          return (
            <div className="input-error">{validationError.emailError}</div>
          );
        else return email.length > 0 ? helpInfo : requiredField;
      case "phone":
        if (validationError.phoneError)
          return (
            <div className="input-error">{validationError.phoneError}</div>
          );
        else return phone.length > 0 ? helpInfo : requiredField;
      case "message":
        return (
          <div className={message.length < 500 ? "input-info" : "input-error"}>
            {500 - message.length}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form">
      <div className="form-title">{title}</div>
      <div className="form-subtitle">{subtitle}</div>
      <form onSubmit={handleFormSubmition}>
        <div className="input-name">
          <input
            type="text"
            placeholder="Full Name *"
            name="name"
            className="input-name__text"
            value={name || ""}
            onChange={(e) => handleInput(e)}
          />
          {subInfo("name")}
        </div>{" "}
        <div className="input-email">
          <input
            type="text"
            placeholder="E-mail *"
            name="email"
            className="input-email__text"
            value={email || ""}
            onChange={(e) => handleInput(e)}
          />
          {subInfo("email")}
        </div>
        <div className="input-phone">
          <input
            type="text"
            placeholder="Phone *"
            name="phone"
            className="input-phone__text"
            value={phone || ""}
            onChange={(e) => handleInput(e)}
          />
          {subInfo("phone")}
        </div>
        <Dropdown />
        <div className="input-message">
          <textarea
            type="text"
            placeholder="Message"
            name="message"
            className="input-message__text"
            value={message || ""}
            onChange={(e) => handleInput(e)}
          />
          {subInfo("message")}
        </div>
        <div
          className={
            !validationError.checkboxError ? "checkbox-title" : "checkbox-error"
          }
        >
          {checkboxTitle}
        </div>
        <label className="checkbox-1-label">
          <input
            name="checkbox1"
            type="checkbox"
            className="checkbox-1"
            onChange={(e) => handleInput(e)}
          />
          Option 1
        </label>
        <label className="checkbox-2-label">
          <input
            name="checkbox2"
            type="checkbox"
            className="checkbox-2"
            onChange={(e) => handleInput(e)}
          />
          Option 2
        </label>
        <button className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
