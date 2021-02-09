import React, { useState } from "react";
import Dropdown from "./Dropdown";

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(0);
  const [checkbox, setCheckbox] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  const [focus, setFocus] = useState(false);
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

  // handle Form submition
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
        "Not valid name: Please provide a name not starting with space and with only latin characters";
    }

    if (emailRegex.test(email)) {
      intermediaryErrors.emailError = "";
    } else {
      intermediaryErrors.emailError =
        "Not valid email: Please provide a valid email";
    }

    if (phoneRegex.test(phone)) {
      intermediaryErrors.phoneError = "";
    } else {
      intermediaryErrors.phoneError =
        "Not valid phone number: Please provide a number of 10 digits";
    }

    if (!(checkbox.checkbox1 == false && checkbox.checkbox2 == false)) {
      intermediaryErrors.checkboxError = "";
    } else {
      intermediaryErrors.checkboxError = "Please select at least one option";
    }

    setError(intermediaryErrors);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const subInfo = (infoForWhat) => {
    const helpInfo = <div className="">Help Info</div>;
    const requiredField = <div className="">This field is required</div>;

    switch (infoForWhat) {
      case "name":
        if (validationError.nameError)
          return <div className="">{validationError.nameError}</div>;
        else return name.length > 0 ? helpInfo : requiredField;
      case "email":
        if (validationError.emailError)
          return <div className="">{validationError.emailError}</div>;
        else return email.length > 0 ? helpInfo : requiredField;
      case "phone":
        if (validationError.phoneError)
          return <div className="">{validationError.phoneError}</div>;
        else return phone.length > 0 ? helpInfo : requiredField;
      case "message":
        return (
          <div
            className={
              message < 2 ? "message-counter" : "message-counter-error"
            }
          >
            {message.length}
            {message.length > 2 && (
              <div>Message must not exceed 100 characters</div>
            )}
          </div>
        );
      case "checkbox":
        if (validationError.checkboxError)
          return <div className="">{validationError.checkboxError}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="form">
      <div className="form-title">Contact Us</div>
      <div className="subtitle">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua
      </div>
      <form className="form" onSubmit={handleFormSubmition}>
        <input
          type="text"
          placeholder="Full Name *"
          name="name"
          value={name || ""}
          onChange={(e) => handleInput(e)}
        />
        {subInfo("name")}
        <input
          type="text"
          placeholder="E-mail *"
          name="email"
          value={email || ""}
          onChange={(e) => handleInput(e)}
        />
        {subInfo("email")}
        <input
          type="text"
          placeholder="Phone *"
          name="phone"
          value={phone || ""}
          onChange={(e) => handleInput(e)}
        />
        {subInfo("phone")}
        <Dropdown />
        <textarea
          type="text"
          placeholder="Message"
          name="message"
          value={message || ""}
          onChange={(e) => handleInput(e)}
        />
        {subInfo("message")}
        <div className="checkbox-title">
          Please select at least one of the following:
        </div>
        <label>
          <input
            name="checkbox1"
            type="checkbox"
            onChange={(e) => handleInput(e)}
          />
          Option 1
        </label>
        <label>
          <input
            name="checkbox2"
            type="checkbox"
            onChange={(e) => handleInput(e)}
          />
          Option 2
        </label>
        {subInfo("checkbox")}
        <button className="form__button">Submit</button>
      </form>
    </div>
  );
};

export default Form;
