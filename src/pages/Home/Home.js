import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        (async function getEvents() {
            try {
                const res = await fetch('https://radiant-ravine-08884.herokuapp.com/events');
                const data = await res.json();
                setEvents(data);
            }
            catch (err) {
                console.error(err.message);
            }
        })()
    }, [])

    return (
        <div>
            <h2>This is Home</h2>
            <div className='event-container'>
                {
                    events.map(event => <div key={event._id}>
                        <div>
                            <img src={event.img} alt="" />
                            <h2>{event.name}</h2>
                            <button className='p-1 px-2 mt-2 bg-slate-700 rounded text-white' onClick={() => navigate(`/book/${event._id}`)}>Book Now</button>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Home;