import React, { useEffect, useRef } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';

const Login = () => {
    const [signInWithEmailAndPassword, user, , error] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const emailRef = useRef('');
    const email = emailRef.current.value;
    const passwordRef = useRef('');
    const password = passwordRef.current.value;
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [token] = useToken(user);

    const handleOnSubmit = e => {
        e.preventDefault();
        signInWithEmailAndPassword(email, password);
    }
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from, token]);
    return (
        <div>
            <h2>Please Login</h2>
            <form className='form-container' onSubmit={handleOnSubmit}>
                <input ref={emailRef} type="email" name="email" id="email" placeholder='Your Email' required />
                <input ref={passwordRef} type="password" name="password" id="password" placeholder='Password' />
                <p>New to Volunteer Network? <Link className='link text-blue-600' to="/register">Please Register</Link></p>
                <input className='bg-slate-700 text-white mt-2' type="submit" value="Login" />
            </form>
        </div>
    );
};

export default Login;