import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordInput = ({
  label,
  name,
  isAutoFocus,
  error,
  ...rest
}) => {

  const [passwordType, setPasswordType] = useState("password")
  const togglePassword = (e) => {
    e.preventDefault()
    if (passwordType==="password") {
        setPasswordType("text")
        return;
    }
    setPasswordType("password")
  }

  return (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        {error && (
        <span className="form-error-badge">
            <FontAwesomeIcon icon={["fa", "times-circle"]} />
        </span>
        )}
        <div className="password-group">
            <input 
                {...rest} 
                autoFocus={isAutoFocus} 
                name={name} 
                id={name} 
                type={passwordType} 
                class="form-control" 
                style={{width:'80vw'}}
            />
            <div className="input-group-btn">
                <button className="btn btn-outline-primary" onClick={togglePassword}>
                { passwordType==="password"? <i className="bi bi-eye-slash"></i> :<i className="bi bi-eye" style={{color:'black'}}></i> }
                </button>
            </div>
        </div>
    </div>
  );
};

export default PasswordInput;