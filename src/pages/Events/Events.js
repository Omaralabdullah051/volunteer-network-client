import React, { useRef } from 'react';
import './Events.css';

const Events = () => {
    const nameRef = useRef('');

    const handleOnSubmit = e => {
        e.preventDefault();
        const event = { name: e.target.name.value, img: e.target.img.value };
        console.log(event);

        fetch('https://radiant-ravine-08884.herokuapp.com/addevent', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(event)
        })
            .then(res => res.json())
            .then(data => {
                alert('Events added');
                e.target.reset();
            });
    }
    return (
        <div>
            <h2 className='text-2xl mt-10'>Add Events</h2>
            <form className='form-container' onSubmit={handleOnSubmit}>
                <input ref={nameRef} type="text" name="name" id="name" placeholder='Event Name' required />
                <input type="text" name="img" id="img" placeholder="Img Url" required />
                <input className='bg-slate-700 text-white' type="submit" value="Add Event" />
            </form>
        </div >
    );
};

export default Events;