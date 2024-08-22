import React, { useState } from 'react';
import './settingsComponent.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { register } from '../../../Store/UserAuthSlice';
const SettingsComponent = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [Bank, setBank] = useState(0);
  const [email, setEmail] = useState(0);
  const [forget, setForget] = useState(0);
  const [step, setStep] = useState(1); // Track the step in password reset
  const [stepEmail,setStepEmail] = useState(1);
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
    otp:'',
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


  const BankNames = [
    'State Bank of India (SBI)', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank (PNB)',
    'Kotak Mahindra Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'Bank of India',
    'Indian Bank', 'Central Bank of India', 'IDFC FIRST Bank', 'Yes Bank', 'Indian Overseas Bank',
    'Syndicate Bank', 'UCO Bank', 'Oriental Bank of Commerce', 'Vijaya Bank', 'Himachal Pradesh National Bank',
    'Jammu and Kashmir Bank', 'Bharatiya Mahila Bank'
  ];

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

  const submitEmailChange = async () => {
    if (!validateEmailChange()) return;
    try {
      // Request OTP to the new email
      const response = await axios.post(`${BACKWEB}/emailChange`, {
        _id:user._id,
        newEmail: EmailChange.email,
        currentPassword: EmailChange.password,
      });
      setStepEmail(2); // Move to OTP verification step
      alert("OTP send to the new Email")
    } catch (error) {
      console.log(error);
      alert('Error sending OTP to new email');
    }
  };

  const submitOTPemail = async () => {
    try {
      // Confirm email change using OTP
      await axios.post(`${BACKWEB}/emailConfirmChange`, {
        _id:user._id,
        otp: EmailChange.otp
      });
      alert('Email updated successfully');
      dispatch(register({
        ...user,
        email:EmailChange.email
      }))
      setStepEmail(1); // Reset step after successful update
    } catch (error) {
      console.log(error);
      alert('Invalid OTP or error confirming email change');
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

  const submitBankDetails = async () => {
    if (!validateBankDetails()) return;
    try {
      const response = await axios.post(`${BACKWEB}/bankDetailsChange`, {...BankDetails,_id:user._id});
      alert('Bank details updated successfully');
      dispatch(register({
        ...user,
        IFSC:BankDetails.IFSC,
        AccountNumber:BankDetails.AccountNumber,
        BankName:BankDetails.BankName,
      }))
    } catch (error) {
      alert('Error updating bank details');
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
            <div className='flex flex-row'>
              <div className='data-bank-info'>Bank Name:</div>
              <select
                className='input-bank-detail Select-bankName'
                name="BankName"
                value={BankDetails.BankName}
                onChange={handleBankDetail}
              >
                <option value="">Select Bank</option>
                {BankNames.map((bankName, index) => (
                  <option key={index} value={bankName}>{bankName}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-row'>
              <div className='data-bank-info'>Account Number:</div>
              <input
                className='input-bank-detail'
                name="AccountNumber"
                value={BankDetails.AccountNumber}
                onChange={handleBankDetail}
                placeholder='Enter your Account Number'
              />
            </div>
            <div className='flex flex-row'>
              <div className='data-bank-info'>IFSC code:</div>
              <input
                className='input-bank-detail'
                name="IFSC"
                value={BankDetails.IFSC}
                onChange={handleBankDetail}
                placeholder='Enter your IFSC code'
              />
            </div>
            <div className='flex flex-row'>
              <div className='data-bank-info'>Password:</div>
              <input
                className='input-bank-detail'
                type='password'
                name="password"
                value={BankDetails.password}
                onChange={handleBankDetail}
                placeholder='Enter your password'
              />
            </div>
            <div className='submit-div-bank'>
              <button className='submit-bank-detail' onClick={submitBankDetails}>Submit</button>
            </div>
          </div>}
        </div>
        <div className='FindPeopleBlock part'>
          <div onClick={() => { setEmail(1 - email) }}>Change Email</div>
          {email !== 0 && <div className='setting-info-block'>
            {stepEmail === 1 && (
              <div>
                <div className='flex flex-row'><div className='data-bank-info'>Email:</div>
                  <input className='input-bank-detail' name="email" onChange={handleEmail} value={EmailChange.email} placeholder="Enter new Email" />
               </div>
                <div className='flex flex-row'><div className='data-bank-info'>Password:</div>
                  <input className='input-bank-detail' type='password' name="password" onChange={handleEmail} value={EmailChange.password} placeholder='Enter your password' />
                </div>
                <div className='submit-div-bank'><button className='submit-bank-detail' onClick={submitEmailChange}>Submit</button></div>
              </div>
            )}
            {stepEmail === 2 && (
              <div>
                <div className='flex flex-row'><div className='data-bank-info'>Enter OTP:</div>
                  <input className='input-bank-detail' name="otp" value={EmailChange.otp} onChange={handleEmail} placeholder='Enter OTP sent to your new email' />
                </div>
                <div className='submit-div-bank'><button className='submit-bank-detail' onClick={submitOTPemail}>Confirm OTP</button></div>
              </div>
            )}
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
