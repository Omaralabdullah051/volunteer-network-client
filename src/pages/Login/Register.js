import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';

const Register = () => {
    const [createUserWithEmailAndPassword, user, , hookError,] = useCreateUserWithEmailAndPassword(auth, {
        sendEmailVerification: true
    });
    const [updateProfile] = useUpdateProfile(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    });
    const [token] = useToken(user);

    const handleName = e => setUserInfo({ ...userInfo, name: e.target.value });
    const handleEmail = e => {
        const validEmail = /^\S+@\S+\.\S+$/.test(e.target.value);
        if (validEmail) {
            setUserInfo({ ...userInfo, email: e.target.value });
            setError({ ...error, emailError: '' });
        }
        else {
            setUserInfo({ ...userInfo, email: '' });
            setError({ ...error, emailError: 'Please provide a valid email' });
        }
    }
    const handlePassword = e => {
        const strongPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})/.test(e.target.value);
        if (strongPassword) {
            setUserInfo({ ...userInfo, password: e.target.value });
            setError({ ...error, passwordError: '' });
        }
        else {
            setUserInfo({ ...userInfo, password: '' });
            setError({ ...error, passwordError: 'Your password must contain at least one digit, lowercase, special character, min 8 character & max 20 characters' });
        }
    }
    const handleConfirmPassword = e => {
        if (userInfo.password === e.target.value) {
            setUserInfo({ ...userInfo, confirmPassword: e.target.value });
            setError({ ...error, confirmPasswordError: '' });
        }
        else {
            setUserInfo({ ...userInfo, confirmPassword: '' });
            setError({ ...error, confirmPasswordError: "Your two passwords doesn't matched" });
        }
    }

    const handleOnSubmit = async e => {
        e.preventDefault();
        if (userInfo.password === userInfo.confirmPassword) {
            await createUserWithEmailAndPassword(userInfo.email, userInfo.password);
            await updateProfile({ displayName: userInfo.name });
            alert('User Created Successfully');
        }
    }

    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from, token]);
    return (
        <div>
            <h2>Please Register</h2>
            <form className='form-container' onSubmit={handleOnSubmit}>
                <input onChange={handleName} type="text" name="name" id="name" placeholder='Your Name' required />
                <input onChange={handleEmail} type="email" name="email" id="email" placeholder='Your Email' required />
                <p className='error'>{error.emailError}</p>
                <input onChange={handlePassword} type="password" name="password" id="password" placeholder='Password' required />
                <p className='error'>{error.passwordError}</p>
                <input onChange={handleConfirmPassword} type="password" name="confirm-password" id="confirm-password" placeholder='Confirm Password' required />
                <p className='error'>{error.confirmPasswordError}</p>
                <p className='error'>{hookError}</p>
                <p>Already have an account? <Link className='link text-blue-600' to="/login">Please Login</Link></p>
                <input className='bg-slate-700 text-white mt-2' type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;