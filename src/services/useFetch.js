import React, { useState, useEffect } from 'react';
import { URL } from "./util/utilty";


export default function useFetch(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function init() {
            try {
                const res = await fetch(URL.API_URL);
                if (res.ok) {
                    const json = await res.json();
                    setData(json.results);
                } else {
                    throw res;
                }
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [url]);
    return { data, error, loading };
};