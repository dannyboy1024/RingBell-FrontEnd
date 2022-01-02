import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const FormInput = ({
  lable,
  name,
  isAutoFocus,
  error,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{lable}</label>
      {error && (
        <span className="form-error-badge">
          <FontAwesomeIcon icon={["fa", "times-circle"]} />
        </span>
      )}
      <input
        {...rest}
        autoFocus={isAutoFocus}
        name={name}
        id={name}
        className="form-control"
      />
    </div>
  );
};

export default FormInput;