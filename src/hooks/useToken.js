import axios from "axios"
import { useEffect, useState } from "react";

const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        (async function getToken() {
            const email = user?.user?.email;
            try {
                if (email) {
                    const { data } = await axios.post('https://radiant-ravine-08884.herokuapp.com/login', { email });
                    setToken(data.accessToken);
                    localStorage.setItem('accessToken', data.accessToken);
                }
            }
            catch (err) {
                console.error(err.message);
            }
        })()
    }, [user])

    return [token];
}

export default useToken;