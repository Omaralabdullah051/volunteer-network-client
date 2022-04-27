import { useEffect, useState } from "react";

const useSpecificEvent = id => {
    const [event, setEvent] = useState({});
    useEffect(() => {
        (async function getEvent() {
            try {
                const res = await fetch(`https://radiant-ravine-08884.herokuapp.com/event/${id}`);
                const data = await res.json();
                setEvent(data);
            }
            catch (err) {
                console.error(err.message);
            }
        })()
    }, [id])

    return [event];
}

export default useSpecificEvent;