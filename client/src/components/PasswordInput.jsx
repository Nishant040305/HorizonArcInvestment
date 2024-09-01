import React, { useState } from 'react';
import './passwordInput.css'
const PasswordInput = ({ name, placeholder, value, onChange,className }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <div className={`password-wrapper ${className} `}>
            <input
                className="Login-email-input"
                type={passwordVisible ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button
                type="button"
                className="password-toggle"
                onClick={() => setPasswordVisible(!passwordVisible)}
            >
                {!passwordVisible ?<i class="fa-solid fa-eye eye-color"></i> : <i class="fa-solid fa-eye-slash eye-color"></i>}
            </button>
        </div>
    );
};

export default PasswordInput;
