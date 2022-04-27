import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.init';
import './Header.css';


const Header = () => {
    const [user] = useAuthState(auth);
    return (
        <nav className='nav-bar'>
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/bookedevents">Booked Events</Link>
            <Link to="/donation">Donation</Link>
            <Link to="/blog">Blog</Link>
            {user?.emailVerified ? <button onClick={() => signOut(auth)}><a href="">SignOut</a></button> : <Link to="/login">Login</Link>}
        </nav>
    );
};

export default Header;