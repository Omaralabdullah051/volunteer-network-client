import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import useSpecificEvent from '../../hooks/useSpecificEvent';

const BookDetails = () => {
    const { id } = useParams();
    // const [event, setEvent] = useState({});
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [event] = useSpecificEvent(id);

    const [info] = useState({
        userName: user.displayName,
        userEmail: user.email,
        eventName: event.name
    })

    // useEffect(() => {
    //     (async function getEvent() {
    //         try {
    //             const res = await fetch(`https://radiant-ravine-08884.herokuapp.com/event/${id}`);
    //             const data = await res.json();
    //             setEvent(data);
    //         }
    //         catch (err) {
    //             console.error(err.message);
    //         }
    //     })()
    // }, [id])

    const handleOnSubmit = e => {
        e.preventDefault();
        const volunteer = { name: e.target.volunteerName.value, email: e.target.email.value, eventName: e.target.eventName.value, address: e.target.address.value, phone: e.target.phone.value };
        console.log(volunteer);

        fetch('https://radiant-ravine-08884.herokuapp.com/addvolunteer', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(volunteer)
        })
            .then(res => res.json())
            .then(data => {
                alert('Events added');
                navigate('/');
            });
    }

    return (
        <div>
            <h2 className='text-2xl mt-10'>Book an event</h2>
            <form className='form-container' onSubmit={handleOnSubmit}>
                <input type="text" defaultValue={user?.displayName} name="volunteerName" id="volunteer-name" placeholder='Your Name' required />
                <input type="email" defaultValue={user?.email} name="email" id="email" placeholder='Your Email' required />
                <input type="text" defaultValue={event.name} name="eventName" id="event-name" placeholder='Event Name' required readOnly />
                <input type="text" name="address" id="address" placeholder='Address' required />
                <input type="text" name="phone" id="phone" placeholder='Phone' required />
                <input className='bg-slate-700 text-white' type="submit" value="Book" />
            </form>
        </div>
    );
};

export default BookDetails;