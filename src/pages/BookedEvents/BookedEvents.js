import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import axiosPrivate from '../../api/axiosPrivate';
import axios from 'axios';

const BookedEvents = () => {
    const [bookedEvents, setBookedEvents] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {

        //TODO: GET request with token in headers by using fetch (async await)
        //* (async function postBookedEvents() {
        //*     try {
        //*        const res = await fetch(`https://radiant-ravine-08884.herokuapp.com/addbookedevents?email=${user?.email}`, {
        //*            method: "GET",
        //*             headers: {
        //*                 authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //*             }
        //*         })
        //*         const data = await res.json();
        //*         setBookedEvents(data);
        //*     }
        //*     catch (err) {
        //*         console.error(err.message);
        //* if (err.response.status === 401 || err.response.status === 403) {
        //*             signOut(auth);
        //*             navigate('/login');
        //*         }
        //*     }
        //* })()

        //*OR

        //TODO: GET request with token in headers by using fetch (without async await)
        //* fetch(`https://radiant-ravine-08884.herokuapp.com/addbookedevents?email=${user?.email}`, {
        //*     method: "GET",
        //*     headers: {
        //*         authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //*     }
        //* })
        //*     .then(res => res.json())
        //*     .then(data => setBookedEvents(data))
        //*     .catch((err) => {
        //*         console.error(err.message);
        //* if (err.response.status === 401 || err.response.status === 403) {
        //*             signOut(auth);
        //*             navigate('/login');
        //*         }
        //*     })

        //*OR

        //TODO:GET request with token in headers by using axios (async await)
        //* (async function postBookedEvents() {
        //*     try {
        //*         const { data } = await axios.get(`https://radiant-ravine-08884.herokuapp.com/addbookedevents?email=${user?.email}`, {
        //*             headers: {
        //*                 authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //*             }
        //*         });
        //*         setBookedEvents(data);
        //*     }
        //*     catch (err) {
        //*         console.error(err.message);
        //*         if (err.response.status === 401 || err.response.status === 403) {
        //*             signOut(auth);
        //*             navigate('/login');
        //*         }
        //*     }
        //* })()

        //*OR
        //TODO:GET request with token in headers by using axios (without async await)
        //* axios.get(`https://radiant-ravine-08884.herokuapp.com/addbookedevents?email=${user?.email}`, {
        //*     headers: {
        //*         authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //*     }
        //* })
        //*     .then(data => setBookedEvents(data.data))
        //*     .catch((err) => {
        //*         console.error(err.message);
        //*         if (err.response.status === 401 || err.response.status === 403) {
        //*             signOut(auth);
        //*             navigate('/login');
        //*         }
        //*     })

        //*OR

        //TODO: GET request with token in headers by using axios interceptor (async await)
        (async function postBookedEvents() {
            try {
                const { data } = await axiosPrivate.get(`https://radiant-ravine-08884.herokuapp.com/addbookedevents?email=${user?.email}`);
                setBookedEvents(data);
            }
            catch (err) {
                console.error(err.message);
                if (err.response.status === 401 || err.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        })()
    }, [user, navigate])

    const handleDeleteEvents = id => {
        const proceed = window.confirm('Are you surely want to delete this booked event?');
        if (proceed);
        (async function deleteBookedEvent() {
            const res = await fetch(`https://radiant-ravine-08884.herokuapp.com/deleteevent?id=${id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.deletedCount >= 1) {
                const restBookedEvents = bookedEvents.filter(bookedEvent => bookedEvent._id !== id);
                setBookedEvents(restBookedEvents);
            }
        })()
    }

    return (
        <div className='p-10 bg-slate-700 mt-10'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Event Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="py-2">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookedEvents.map(bookedEvent => <tr key={bookedEvent._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {bookedEvent.name}
                                </th>
                                <td className="px-6 py-4">
                                    {bookedEvent.email}
                                </td>
                                <td className="px-6 py-4">
                                    {bookedEvent.eventName}
                                </td>
                                <td className="px-6 py-4">
                                    {bookedEvent.address}
                                </td>
                                <td className="px-6 py-4">
                                    {bookedEvent.phone}
                                </td>
                                <td className="pr-6 py-4 text-right">
                                    <button onClick={() => handleDeleteEvents(bookedEvent._id)} className="font-medium text-red-600 dark:text-red   -500 hover:underline">Delete</button>
                                </td>
                            </tr>)

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookedEvents;