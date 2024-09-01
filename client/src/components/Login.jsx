import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ".././assets/Login.css";
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../Store/UserAuthSlice';
import { setSeen, setSeenlog } from '../Store/LoginSeenSlice';
import axios from "axios";
import PasswordInput from './PasswordInput'; // Import the PasswordInput component

const Login = () => {
    let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
    axios.defaults.withCredentials = true;
    const dispatch = useDispatch();
    const [form, setForm] = useState(1); // 1: Login, 0: Register, 2: Forgot Password
    const [step, setStep] = useState(1); // Step in forgot password flow: 1: Request OTP, 2: Confirm OTP, 3: Update Password
    const [resendTimer, setResendTimer] = useState(0); // Timer for resend button
    const [otpExpiryTimer, setOtpExpiryTimer] = useState(0); // 3 minutes timer for OTP expiry
    const [intervalId, setIntervalId] = useState(null); // Store interval ID for cleanup

    useEffect(() => {
        // Cleanup timer on component unmount
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [intervalId]);

    const startResendTimer = () => {
        setResendTimer(30); // Start the timer at 30 seconds
        const id = setInterval(() => {
            setResendTimer(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(id);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        setIntervalId(id);
    };

    const startOtpExpiryTimer = () => {
        setOtpExpiryTimer(300); // Start the timer at 300 seconds (5 minutes)
        const id = setInterval(() => {
            setOtpExpiryTimer(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(id);
                    setMssg("OTP has expired. Please request a new one.");
                    setStep(1); // Reset to OTP request step
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        setIntervalId(id);
    };

    const navigate = useNavigate();
    const [userVer, setUserver] = useState({
        Username: "",
        password: "",
    });
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const [passwordReset, setPasswordReset] = useState({
        email: "",
        otp: "",
        confirmationToken: "",
        newPassword: "",
        confirmPassword: "",
    });
    
    const [mssg, setMssg] = useState(null);

    const handleUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleUserVer = (e) => {
        setUserver({
            ...userVer,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordReset = (e) => {
        setPasswordReset({
            ...passwordReset,
            [e.target.name]: e.target.value
        });
    };

    const login_email = async () => {
        try {
            const response = await axios.post(`${BACKWEB}/register`, user, {
                headers: {
                    'Accept': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('Failed to Send Email');
            } else {
                setMssg(response.data.message);
                setForm(1);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const login_Confirm = async () => {
        try {
            const response = await axios.post(`${BACKWEB}/login`, userVer, {
                headers: {
                    'Accept': 'application/json',
                },
                mode: "cors",
                withCredentials: true
            });

            if (response.status === 200) {
                dispatch(register(response.data.info));
                dispatch(setSeen(1));
            }
        } catch (e) {
            setMssg(e.response?.data?.error || "An error occurred");
        }
    };

    const handlePasswordChange = async () => {
        try {
            const response = await axios.post(`${BACKWEB}/passwordChange`, { email: passwordReset.email, _id: null });
            setMssg(response.data.message);
            setStep(2);
            startResendTimer(); // Start the timer when OTP is requested
            startOtpExpiryTimer(); // Start OTP expiry timer
        } catch (e) {
            console.error(e);
        }
    };
    
    const handlePasswordConfirm = async () => {
        try {
            const response = await axios.post(`${BACKWEB}/passwordConfirm`, {
                email: passwordReset.email,
                otp: passwordReset.otp
            });
            setPasswordReset({
                ...passwordReset,
                confirmationToken: response.data.token
            });
            setStep(3);
            setMssg("");
        } catch (e) {
            console.error(e);
        }
    };

    const handlePasswordUpdate = async () => {
        if (passwordReset.newPassword.length < 6) {
            setMssg("Password must be greater than 6 characters.");
            return;
        }
    
        if (passwordReset.newPassword !== passwordReset.confirmPassword) {
            setMssg("Passwords do not match.");
            return;
        }
    
        try {
            const response = await axios.post(`${BACKWEB}/passwordUpdate`, {
                token: passwordReset.confirmationToken,
                newPassword: passwordReset.newPassword,
            });
            setMssg("Password updated successfully!");
            setForm(1);
            setStep(1);
            setPasswordReset({
                email: "",
                confirmationToken: "",
                newPassword: "",
                otp: "",
                confirmPassword: "",
            });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="loginpage">
            <img className="login-image" src="https://img.freepik.com/free-photo/observation-urban-building-business-steel_1127-2397.jpg?w=1060&t=st=1720159831~exp=1720160431~hmac=79382a1c2c14b889a33d9dd9a94d3fc6aaf4a84884f40f76a1cd2b8ad61e775b" alt="Login" />
            <div className="Login-info">
                <div className="Login-email">
                    <div className="Login-title">
                        <div className="log">
                            {form === 1 ? "Log In" : form === 0 ? "Sign In" : "Forgot Password"}
                        </div>
                        <div className="login-cross" onClick={() => dispatch(setSeenlog(1))}><i className="fa fa-close" style={{ fontSize: 35 }}></i></div>
                    </div>
                    {form === 1 && (
                        <div className="Login-data">
                            Enter your details to Login.
                        </div>
                    )}
                    {form === 0 && (
                        <div className="Login-data">
                            Enter your details to sign in.
                        </div>
                    )}
                    {form === 2 && (
                        <div className="Login-data">
                            {step === 1 ? "Enter your email to receive an OTP." :
                                step === 2 ? "Enter the OTP sent to your email." :
                                    "Enter your new password."}
                        </div>
                    )}
                    {form === 1 && (
                        <div className="Login-content">
                            <div className='text-red-500'>{mssg}</div>
                            <input className="Login-email-input" onChange={handleUserVer} name="Username" placeholder="Enter your Username/Email" value={userVer.Username}></input>
                            <PasswordInput onChange={handleUserVer} name="password" placeholder="Enter your Password" value={userVer.password}></PasswordInput>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <button style={{ marginTop: 50, width: 250 }} className="btn Login-email-buttton" onClick={login_Confirm}>Confirm</button>
                                {mssg === "An Email sent to your account please verify" && (
                                    <button className='btn Login-email-buttton' style={{ marginTop: 50, width: 250 }} onClick={login_email}>RESEND</button>
                                )}
                            </div>
                        </div>
                    )}
                    {form === 0 && (
                        <div className="Login-content">
                            <div className='text-red-500'>{mssg}</div>
                            <input className="Login-email-input" onChange={handleUser} placeholder="Enter your FullName" name="fullName" value={user.fullName}></input>
                            <PasswordInput className="Login-email-input" onChange={handleUser} placeholder="Enter your Password" name="password" value={user.password}></PasswordInput>
                            <input className="Login-email-input" onChange={handleUser} placeholder="Enter your Email" name="email" value={user.email}></input>
                            <button className="btn Login-email-buttton" onClick={login_email}>Continue</button>
                        </div>
                    )}
                    {form === 2 && (
                        <div className="Login-content">
                            {step === 1 && (
                                <div>
                                    <div className='text-red-500'>{mssg}</div>
                                    <input className="Login-email-input" onChange={handlePasswordReset} name="email" placeholder="Enter your Email" value={passwordReset.email}></input>
                                    <button className="btn Login-email-buttton" onClick={handlePasswordChange}>Request OTP</button>
                                </div>
                            )}
                            {step === 2 && (
                                <div>
                                    <div className='text-slate-600 mb-4 otpexpiry '>OTP expires in {Math.floor(otpExpiryTimer / 60)}:{String(otpExpiryTimer % 60).padStart(2, '0')}</div>
                                    <input className="Login-email-input" onChange={handlePasswordReset} name="otp" placeholder="Enter OTP" value={passwordReset.otp}></input>
                                    <div className='flex flex-row justify-evenly'>
                                    <button className="btn Login-email-buttton" onClick={handlePasswordConfirm}>Confirm OTP</button>
                                    <button 
                                        className="btn Login-email-buttton mt-4" 
                                        onClick={handlePasswordChange} 
                                        disabled={resendTimer > 0}
                                    >
                                        {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                                    </button>
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div>
                                    <div className='text-red-500'>{mssg}</div>
                                    <PasswordInput className="Login-email-input" onChange={handlePasswordReset} name="newPassword" placeholder="Enter New Password" value={passwordReset.newPassword}></PasswordInput>
                                    <PasswordInput className="Login-email-input" onChange={handlePasswordReset} name="confirmPassword" placeholder="Confirm Password" value={passwordReset.confirmPassword}></PasswordInput>
                                    <button className="btn Login-email-buttton" onClick={handlePasswordUpdate}>Update Password</button>
                                </div>
                            )}
                        </div>
                    )}
                    <div className='mt-10'>
                        {form === 1 && (
                            <div className='flex flex-row justify-evenly'>
                                <div className='text-blue-500' onClick={() => setForm(0)}>Click here to register</div>
                                <div className='text-blue-500' onClick={() => setForm(2)}>Forgot Password?</div>
                            </div>
                        )}
                        {form === 0 && (
                            <div className='text-blue-500' onClick={() => setForm(1)}>Click here to Login</div>
                        )}
                        {form === 2 && (
                            <div className='text-blue-500' onClick={() => setForm(1)}>Back to Login</div>
                        )}
                    </div>
                </div>
                <div className="line" style={{ display: "flex" }}>
                    <hr /> OR <hr />
                </div>
                <div className="Login-Oauth">
                    <div className="Login-term">
                        <div className="term">
                            By continuing, you agree to the updated <strong>Terms of Sale</strong>, <strong>Terms of Service</strong>, and <strong>Privacy Policy.</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
