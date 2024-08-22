import React, { useState } from 'react';
import './settingsComponent.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SettingsComponent = () => {
  const user = useSelector(state => state.user);
  const [Bank, setBank] = useState(0);
  const [email, setEmail] = useState(0);
  const [forget, setForget] = useState(0);
  const [step, setStep] = useState(1); // Track the step in password reset
  const [confirmationToken, setConfirmationToken] = useState(null);
  let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const [BankDetails, setBankDetails] = useState({
    AccountNumber: '',
    BankName: '',
    IFSC: '',
    password: '',
  });

  const [EmailChange, setEmailChange] = useState({
    email: '',
    password: '',
  });

  const [passwordChange, setPasswordChange] = useState({
    email: '',
  });

  const handleBankDetail = (e) => {
    setBankDetails({
      ...BankDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmail = (e) => {
    setEmailChange({
      ...EmailChange,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassword = (e) => {
    setPasswordChange({
      ...passwordChange,
      [e.target.name]: e.target.value,
    });
  };

  const validateBankDetails = () => {
    const { AccountNumber, BankName, IFSC, password } = BankDetails;

    // Validate that all fields are filled
    if (!AccountNumber || !BankName || !IFSC || !password) {
      alert('All fields are required for Bank Details');
      return false;
    }

    // Validate account number (assuming it should be 10-16 digits)
    const accountNumberPattern = /^\d{10,16}$/;
    if (!accountNumberPattern.test(AccountNumber)) {
      alert('Account Number should be between 10 and 16 digits');
      return false;
    }

    // Validate bank name (assuming it should be letters and possibly spaces)
    const bankNamePattern = /^[A-Za-z\s]+$/;
    if (!bankNamePattern.test(BankName)) {
      alert('Bank Name should contain only letters and spaces');
      return false;
    }

    // Validate IFSC code (assuming standard 11-character alphanumeric format)
    const ifscPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscPattern.test(IFSC)) {
      alert('Invalid IFSC code format');
      return false;
    }

    // Validate password (minimum 6 characters)
    if (password.length < 6) {
      alert('Password should be at least 6 characters long');
      return false;
    }

    return true;
  };

  const validateEmailChange = () => {
    const { email, password } = EmailChange;

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      alert('Enter a valid email address');
      return false;
    }

    // Validate password (minimum 6 characters)
    if (password.length < 6) {
      alert('Password should be at least 6 characters long');
      return false;
    }

    return true;
  };

  const submitBankDetails = async () => {
    if (!validateBankDetails()) return;
    try {
      const response = await axios.post(`${BACKWEB}/api/bank-details`, BankDetails);
      alert('Bank details updated successfully');
    } catch (error) {
      alert('Error updating bank details');
    }
  };

  const submitEmailChange = async () => {
    if (!validateEmailChange()) return;
    try {
      const response = await axios.post(`${BACKWEB}/api/change-email`, EmailChange);
      alert('Email updated successfully');
    } catch (error) {
      alert('Error updating email');
    }
  };

  const submitPasswordChange = async () => {
    try {
      const response = await axios.post(`${BACKWEB}/passwordChange`, { _id: user._id });
      setStep(2); // Move to OTP verification step
    } catch (error) {
      console.log(error);
      alert('Error resetting password');
    }
  };

  const submitOTP = async () => {
    try {
      const response = await axios.post(`${BACKWEB}/passwordConfirm`, {
        _id: user._id,
        otp: passwordChange.otp
      });
      setConfirmationToken(response.data.token);
      setStep(3); // Move to password update step
    } catch (error) {
      console.log(error);
      alert('Invalid OTP');
    }
  };

  const submitPasswordUpdate = async () => {
    if (passwordChange.newPassword !== passwordChange.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post(`${BACKWEB}/passwordUpdate`, {
        token: confirmationToken,
        newPassword: passwordChange.newPassword
      });
      alert('Password updated successfully');
    } catch (error) {
      console.log(error);
      alert('Error updating password');
    }
  };

  return (
    <div className='dashboard-settings'>
      <div className='bg-slate-100 heading'>Settings</div>
      <div className='setting-block'>
        <div className="FindPeopleBlock part">
          <div className='' onClick={() => { setBank(1 - Bank) }}>Bank Details</div>
          {Bank !== 0 && <div className='setting-info-block'>
            <div className='flex flex-row'><div className='data-bank-info'>Account Number:</div>
              <input className='input-bank-detail' name="AccountNumber" value={BankDetails.AccountNumber} onChange={handleBankDetail} placeholder='Enter your Account Number' />
            </div>
            <div className='flex flex-row'><div className='data-bank-info'>Bank Name:</div>
              <input className='input-bank-detail' name="BankName" value={BankDetails.BankName} onChange={handleBankDetail} placeholder='Enter your Bank Name' />
            </div>
            <div className='flex flex-row'><div className='data-bank-info'>IFSC code:</div>
              <input className='input-bank-detail' name="IFSC" value={BankDetails.IFSC} onChange={handleBankDetail} placeholder='Enter your IFSC code' />
            </div>
            <div className='flex flex-row'><div className='data-bank-info'>Password:</div>
              <input className='input-bank-detail' type='password' name="password" value={BankDetails.password} onChange={handleBankDetail} placeholder='Enter your password' />
            </div>
            <div className='submit-div-bank'><button className='submit-bank-detail' onClick={submitBankDetails}>Submit</button></div>
          </div>}
        </div>
        <div className='FindPeopleBlock part'>
          <div onClick={() => { setEmail(1 - email) }}>Change Email</div>
          {email !== 0 && <div className='setting-info-block'>
            <div className='flex flex-row'><div className='data-bank-info'>Email:</div>
              <input className='input-bank-detail' name="email" onChange={handleEmail} value={EmailChange.email} placeholder="Enter new Email" />
           </div>
            <div className='flex flex-row'><div className='data-bank-info'>Password:</div>
              <input className='input-bank-detail' type='password' name="password" onChange={handleEmail} value={EmailChange.password} placeholder='Enter your password' />
            </div>
            <div className='submit-div-bank'><button className='submit-bank-detail' onClick={submitEmailChange}>Submit</button></div>
          </div>}
        </div>
        <div className='FindPeopleBlock part'>
          <div onClick={() => { setForget(1 - forget) }}>Change Password</div>
          {forget !== 0 && <div className='setting-info-block'>
            {step === 1 && (
              <div>
                <div className='flex flex-row'><div className='data-bank-info'>Confirm Email:</div>
                  <div className='bg-white text-black'>{user.email}</div>
                </div>
                <div className='submit-div-bank'><button className='submit-bank-detail' onClick={submitPasswordChange}>Send OTP</button></div>
              </div>
            )}
            {step === 2 && (
              <div>
                <div className='flex flex-row'><div className='data-bank-info'>Enter OTP:</div>
                  <input className='input-bank-detail' name="otp" value={passwordChange.otp} onChange={handlePassword} placeholder='Enter your OTP' />
                </div>
                <div className='submit-div-bank'><button className='submit-bank-detail' onClick={submitOTP}>Submit OTP</button></div>
              </div>
            )}
            {step === 3 && (
              <div>
                <div className='flex flex-row'><div className='data-bank-info'>New Password:</div>
                  <input className='input-bank-detail' type='password' name="newPassword" value={passwordChange.newPassword} onChange={handlePassword} placeholder='Enter new password' />
                </div>
                <div className='flex flex-row'><div className='data-bank-info'>Confirm Password:</div>
                  <input className='input-bank-detail' type='password' name="confirmPassword" value={passwordChange.confirmPassword} onChange={handlePassword} placeholder='Confirm new password' />
                </div>
                <div className='submit-div-bank'><button className='submit-bank-detail' onClick={submitPasswordUpdate}>Update Password</button></div>
              </div>
            )}
          </div>}
        </div>
        <div className='FindPeopleBlock part'>Help</div>
      </div>
    </div>
  );
};

export default SettingsComponent;
